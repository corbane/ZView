/// <reference path="../core/v-element.ts" />
/// <reference path="element.ts" />
/// <reference path="level.ts" />

module ZView
{
    type TZContent = "observateur"|"sympatisant"|"participant"|"acteur"

    export class VDocument extends Core.VElement <Element>
    {
        readonly doc: Document

        private nodeStyle: HTMLStyleElement|SVGStyleElement

        levels: { [K in TZContent]: Depth <TZContent> }

        activeLevel: number

        constructor (node: Element)
        {
            super (node)
            this.doc = node.ownerDocument
            this.nodeStyle = document.createElement("style")

            this.loadFlatTree ()
        }

        private loadFlatTree (getLevelIndex: (el: Element) => number = null)
        {
            if( !getLevelIndex )
                getLevelIndex = (el: Element) => ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf (el.tagName.toLowerCase ())

            var el = this.node.firstElementChild,
                parent = this as Core.VElement <Element>,
                stack = [parent],
                level = 0

            while( el )
            {
                var child = new ZView.VElement (el),
                    l = getLevelIndex (el) + 1

                if( l )
                {
                    if( l <= level )
                        parent = stack[l].parent    

                    parent.children.add (child)

                    parent = child
                    stack[l] = parent
                    level = l
                }
                else
                {
                    child.attribute.set ({ "data-zview": (level + 1).toString () })
                    parent.children.add (child)
                }

                el = el.nextElementSibling
            }
        }

        expand (level: number)
        {
            var s = ""
            for( var i = 0 ; i != level + 1 ; ++i )
                s += `[data-zview="${i}"] { display: none }`
            this.nodeStyle.innerHTML = s

            this.activeLevel = level
        }
    }
}