/// <reference path="v-children.ts" />
/// <reference path="v-attribute.ts" />
/// <reference path="v-event.ts" />

declare interface Element
{
    vElement: Core.VElement <any>
}

module Core
{
    export class VElement <E extends Element>
    {
        readonly doc: Document

        HCreated = new VEvent.Handle <(vel: this) => void> ()

        constructor (readonly node: E)
        {
            node.vElement = this
            this.doc = node.ownerDocument

            this.children = new VChildren (this)

            this.HCreated.trigger (this)
        }

        style =
        {
            add: function (css: { [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] })
            {
                for( var name in css )
                    this.element.style[name] = css[name]
            }
            .bind (this)
        }

        class = this.node.classList

        attribute = new VAttribute (this)

        children: VChildren <this>

        get parent (): this
        {
            return this._parent
        }

        get previous (): this
        {
            return this._prev
        }

        get next (): this
        {
            return this._next
        }

        get textContent (): string
        { return this.node.textContent }
    }
}



