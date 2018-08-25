/// <reference path="../core/v-element.ts" />

module ZView
{
    // levels = ["observateur", "sympatisant", "participant", "acteur"]
    // levels = ["abstract", "détail", "vulgarisation", "Technique"]
    // doc.level ("abstract").show ()
    // doc.level ("détail").children.add ( ... )

    export class VElement <T extends Element> extends Core.VElement <T>
    {
        private level = 0

        constructor (node: T)
        {
            super (node)
            this.children.HChildAdded.add (this.onLevelChildAdded.bind (this))
        }

        private onLevelChildAdded (child: this, prev: this, next: this)
        {
            child.level = this.level + 1
        }

        expand ()
        {
            for( var el of this.children )
                el.class.add ("zv-show")
        }

        reduce ()
        {
            for( var el of this.children )
                el.class.remove ("zv-show")
        }
    }
}
