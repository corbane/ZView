/// <reference path="../core/v-element.ts" />
/// <reference path="document.ts" />

module ZView
{
    // doc.dimensions.add ( ZView.createDimention (type, names) )
    //var p = new Dimension ("zview", [ "abstract", "vulgarisation", "detail", "technical" ])
    //var d = createDimention ("zperm", [ "public", "shared", "private" ])
    //d.private.show ()
    // <level type="z" name="abstract"> ... </level>
    // <div data-dimension="zview" data-depth="abstract"> ... </div>
    // <div data-dimension="zperm" data-depth="shared"> ... </div>

    // zview.tilios.service

    export class Dimension
    {
        depths: { [key: string]: Depth <string> }

        constructor (readonly type: string)
        { }
    }

    export class PermsDimention extends Dimension
    {
        depths = {
            public: new Depth ("public", null),
            shared: new Depth ("shared", null),
            private: new Depth ("private", null)
        }

        constructor ()
        {
            super ("zperm")
        }
    }


    /**
     * @example
     * extractDimentsions (doculent.body, [new ZDimension, new StatsDimention])
     */
    export function extractDimentsions (el: Element, dims: Dimension [])
    {
        var ts = [] as string[]
        for( let d of dims )
            ts.push (d.type)

        _walk (el.firstElementChild)

        function _walk (el: Element)
        {
            while( el )
            {
                let d = el.getAttribute ("data-dimension"),
                    di: number,
                    depth: Depth <any>

                if( d && (di = ts.indexOf (d)) != -1 )
                {
                    let dim = dims[di]
                    let depth = dim.depths[el.getAttribute ("data-depth")]
                    if( depth )
                    {
                        if( el.vElement )
                            depth.add (el.vElement)
                        else
                            depth.add (new Core.VElement (el))
                    }
                }

                if( el.firstElementChild )
                    _walk (el.firstElementChild)
                
                if( el.nextElementSibling )
                    el = el.nextElementSibling
                else
                    break
            }
        }
    }

    export class Depth <Ls extends string> extends Core.VChildren <Core.VElement <Element>>
    {
        private level = 0

        constructor (id: Ls, vel: Core.VElement <Element>)
        {
            super (vel)
            vel.node.setAttribute ("data-level", id)
            this.HChildAdded.add (this.onLevelChildAdded.bind (this))
        }

        private onLevelChildAdded (child: this, prev: this, next: this)
        {
            child.level = this.level + 1
        }

        show ()
        {
            //var s = ""
            //for( var el of this )
            //    s += `[data-zview="${el.level}"] { display: none }`
            //this.styleNode.innerHTML = s
        }
    }
}
