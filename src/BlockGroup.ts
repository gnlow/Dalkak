import { Local } from "./Local"
import { Block } from "./Block"
import { Project } from "./Project"
import { Dict, Dictable } from "./Dict"
import { Param } from "./Param"
import { Type } from "./Type"
import { Template } from "./Template"
import { Pack } from "./Pack"
import type { Platform } from "./Platform"

interface prop {
    blocks?: Array<Block>,
    name?: string, 
    template?: string, 
    params?: Dictable<Param>,
    pack?: Pack,
}

export class BlockGroup extends Block {
    name: string
    template: Template
    params: Dict<Param>
    paramTypes: Dict<Type>
    returnType: Type

    blocks: Array<Block>
    constructor({
        blocks = [],
        ...option
    }: prop = {}) {
        super(option)
        this.blocks = blocks
    }
    async run(project: Project, local: Local = new Local, platform?: Platform) {
        local = local.dive(this)
        for (var block of this.blocks) {
            await block.run(project, local, platform)
        }
    }
    attach(blockGroup: BlockGroup): BlockGroup {
        return new BlockGroup({
            blocks: this.blocks.concat(blockGroup.blocks)
        })
    }
    export(): string {
        var exported = ""
        this.blocks.forEach(block => exported += `${block.export()}\n`)
        return exported
    }
    static fromBlock(block: Block): BlockGroup {
        return new BlockGroup({blocks: [block]})
    }
}