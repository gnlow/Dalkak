import Vector from "./Vector";
import Event from "./Event";
import BlockInfo from "./BlockInfo";
import Block from "./Block";
import BlockGroup from "./BlockGroup";
export default class Thing {
    name: string;
    pos: Vector;
    blocks: Array<BlockGroup>;
    constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>);
    addBlock(blockGroup: BlockGroup): this;
    ready(): void;
    static fromBlock(block: Block, event?: Event): Thing;
    static fromBlockInfo(blockInfo: BlockInfo, event?: Event): Thing;
}
