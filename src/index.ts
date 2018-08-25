/// <reference path="virtual/element.ts" />
/// <reference path="virtual/document.ts" />

module ZView
{
    var style = document.createElement("style"),
        level = { current: 5, min: 0, max: 5 },
        curActive: Element = null,
        doc = {
            documentRootSelector: "body",
            root: null as Core.VElement <any>,
            level: { current: 6, min: 1, max: 6 },
        }
    
    document.head.appendChild(style)

    document.addEventListener ("DOMContentLoaded", () =>
    {
        var el = document.querySelector (doc.documentRootSelector)
        initFlatDocument (el)
        document.addEventListener("mousewheel", onMouseWhell)

        console.log (doc.root)
    })

    function init (doc: VDocument)
    {
        for( var child of doc.children )
        {
            child.node.addEventListener ("click", onTap)
            //child.attribute.set ({ "data-zview":  })
        }
    }
    
    function initFlatDocument (root: Element)
    {
        var parent = new Core.VElement (root),
            stack = [parent],
            level = 0

        doc.root = parent

        var el = root.firstElementChild
        while( el )
        {
            var child = new ZView.VElement (el)

            var l = ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf (el.tagName.toLowerCase ()) + 1
            if( l )
            {
                el.addEventListener ("click", onTap)
                child.attribute.set ({ "data-zview": l.toString () })

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

    function onMouseWhell (evt: WheelEvent)
    {
        if( !evt.ctrlKey ) return false

        evt.preventDefault() // annule le zoom par defaut du navigateur

        if( curActive )
            hideSection (curActive)

        if( evt.wheelDelta < 0 && level.current != level.min )
            level.current--
        else
        if( evt.wheelDelta > 0 && level.current != level.max )
            level.current++
        else
            return

        var stl = ""
        for( var i = level.current + 1 ; i != level.max + 1 ; i++ )
            stl += `[data-zview="${i}"] { display: none }`
        style.innerHTML = stl
    }

    function onTap (evt: Event)
    {
        toogleSection (evt.currentTarget as Element)
    }

    function toogleSection (el: Element)
    {
        if( curActive == el )
        {
            hideSection (el)
            return
        }
        
        if( curActive )
            hideSection (curActive)

        showSection (el)
    }

    function showSection (el: Element)
    {
        (el.vElement as VElement <any>).expand ()
        curActive = el
    }

    function hideSection (el: Element)
    {
        (el.vElement as VElement <any>).reduce ()
        curActive = null
    }
}