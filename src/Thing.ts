import { Vector } from "./Vector"
import type { Local } from "./Local"
import type { BlockGroup } from "./BlockGroup"
import { Util } from "./Util"
import type { Project } from "./Project"
import type { Platform } from "./Platform"

interface prop {
    name?: string, 
    pos?: Vector, 
    blockGroups?: Array<BlockGroup>
}

export class Thing{
    name: string
    pos: Vector
    blockGroups: Array<BlockGroup>
    constructor({
        name = Util.randString(5), 
        pos = new Vector(), 
        blockGroups = []
    }: prop = {}) {
        this.name = name
        this.pos = pos
        this.blockGroups = blockGroups
    }
    run(project: Project, local: Local, platform?: Platform) {
        local = local.dive(this)
        this.blockGroups.forEach((blockGroup) => {
            blockGroup.run(project, local, platform)
        })
    }
    addBlock(blockGroup: BlockGroup): this {
        this.blockGroups.push(blockGroup)
        return this
    }
}