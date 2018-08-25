declare module Core
{
    interface VElement <E extends Element>
    {
        /** @hidden */
        _parent: this

        /** @hidden */
        _prev: this

        /** @hidden */
        _next: this
    }
}

module Core
{
    export interface OAtom <DT extends string>
    {
        "@type": DT
    }

    export class Atom <T extends OAtom <string>>
    {
        constructor (readonly data: T)
        { }
    }
    
    export interface OList <T> extends OAtom <"https://jmvrecq.pro/api/core/list">
    {
        items: T[]
    }

    export class List <T> extends Atom <OList <T>>
    {
        constructor (readonly items: T[] | OList <T>)
        {
            super (
                items["@type"]
                ? items as OList <T>
                : {
                    "@type": "https://jmvrecq.pro/api/core/list",
                    items: items as T[]
                }
            )
        }

        count (): number
        {
            return this.data.items.length 
        }

        add (...childs: T[]): this
        {
            for( var child of childs )
            {
                this.data.items.push (child)
            }

            return this
        }

        indexOf (child: T): number
        {
            var i = 0

            for( var vel of this.data.items )
            {
                if( vel === child )
                    return i

                ++i
            }

            return -1
        }

        get (e: number|T): ListItem <T>
        {
            var i: number = typeof e == "number" ? e : this.indexOf (e)

            if( i < 0 || i > this.data.items.length )
                return null
            
            var c = this.data.items
            return new ListItem (this, c[i])
        }
        
        [Symbol.iterator](): Iterator <T>
        {
            var i = 0

            return {
                next: (): IteratorResult <T> => 
                {
                    return i == this.data.items.length
                        ? { done: true, value: undefined }
                        : { done: false, value: this.data.items[i++] }
                }
            }
        }
    }

    export interface OListItem <T> extends OAtom <"https://jmvrecq.pro/api/core/list-item">
    {
        value: T
        prev: T
        next: T
    }

    export class ListItem <T> extends Atom <OListItem <T>>
    {
        constructor (readonly list: List <T>, value: T | OListItem <T>)
        {
            super (
                value["@type"]
                ? value as OListItem <T>
                : {
                    "@type": "https://jmvrecq.pro/api/core/list-item",
                    value: value as T,
                    prev: null,
                    next: null
                }
            )
        }

        get prev (): ListItem <T>
        {
            var i = this.list.indexOf (this.data.value)
            return this.list.get (i - 1)
        }

        get next (): ListItem <T>
        {
            var i = this.list.indexOf (this.data.value)
            return this.list.get (i + 1)
        }
    }


//http://jnuno.com/tree-model-js/

    export class Tree <T>
    {
        readonly children: List <OTree <T>>

        constructor (readonly data: OTree <T>)
        {
            this.children = new List (null)
        }

        get parent (): Tree <T>
        {
            if( !this.data.parent )
                return null

            return new Tree ({ node: this.data.parent, parent: null, null })
        }

        next (): Tree <T>
        {
            var parent = this.parent
            if( !parent )
                return null

            return new Tree (parent.children.get (this.data).next)
        }

        // length, add, has, get, indexOf, remove, [Symbol.iterator]
    }

    export class OTree <T>
    {
        node: T
        parent: OTree <T>
        children: OTree <T> []
    }









    
    export class VChildren <VE extends VElement <Element>> implements Iterable <VE>
    {
        protected childs = [] as VE []
        protected Ids    = [] as string []
        
        public readonly HChildAdded = new VEvent.Handle <(child: VE) => void> ()
        public readonly HChildRemoved = new VEvent.Handle <(child: VE) => void> ()

        constructor (readonly parent: VE)
        { }

        add (...childs: VE []): void
        {
            var prev = this.childs[this.childs.length - 1] || null
            for( var child of childs )
            {
                this.childs.push (child)

                if( prev )
                    prev._next = child

                child._parent = this.parent
                child._prev = prev
                child._next = null

                this.HChildAdded.trigger (child)
                prev = child
            }
        }

        has (child: string|VE): boolean
        { 
            return !(this.indexOf (child) == -1)
        }

        indexOf (child: string|VE): number
        {
            if( typeof child == "string" )
            {
                var i = 0
                for( var vel of this.childs )
                {
                    if( vel.node.id === child ) return i
                    ++i
                }
            }
            else
            {
                var i = this.childs.indexOf (child)
                if( i != -1 )
                    return i
            }
            return -1
        }

        get (i: number|string): VE
        {
            if( typeof i == "string" )
            {
                i = this.indexOf (i)
                if( i == -1 )
                    return null
            }

            return this.childs[i]
        }

        length = this.childs.length

        remove (...childs: (string|VE)[])
        {
            for( var child of childs )
            {
                var i = this.indexOf (child)
                if( i == -1 ) continue

                var del = this.childs.splice (i, 1) [0],
                    prev = i < this.childs.length ?  this.childs[i] : null,
                    next = i == 0 ? null : this.childs[i-1]

                if( prev )
                    prev._next = next

                del._parent = null
                del._prev = del._next = null

                if( next )
                    next._prev = prev

                this.HChildRemoved.trigger (del)
            }
        }

        clear ()
        { 
            this.childs = []
        }
        
        [Symbol.iterator](): Iterator <VE>
        {
            var i = 0

            return {
                next: (): IteratorResult <VE> => 
                {
                    return i == this.childs.length
                        ? { done: true, value: undefined }
                        : { done: false, value: this.childs[i++] }
                }
            }
        }

        toArray (): Array <VE>
        {
            return Object.create (this.childs)
        }
    }
}