
module Core
{
    export class VAttribute
    {
        private data = {} as { [key: string]: any }

        constructor (protected parent: VElement <Element>)
        { }

        set (attrs: { [key: string]: string } )
        {
            Object.assign (this.data, attrs)
            //for( var name in attrs )
            //    this.parent.node.setAttribute (name, attrs[name])
        }

        has (...attrs: string[])
        {
            for( var name in attrs )
                //if( !this.parent.node.hasAttribute (name) )
                if( !this.data[name] )
                    return false
            
            return true
        }

        get (name: string): string
        {
            //return this.parent.node.getAttribute (name)
            return this.data[name]
        }

        remove (...attrs: string[])
        {
            for( var name in attrs )
                //this.parent.node.removeAttribute (name)
                delete this.data[name]
        }
    }
}