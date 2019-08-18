import Event from "./Event";
import Block from "./Block";
import BlockInfo from "./BlockInfo";
export default class BlockGroup {
    event: Event;
    blocks: Array<Block>;
    constructor(event?: Event, blocks?: Array<Block>);
    ready(): this;
    start(e: any): this;
    attach(blockGroup: BlockGroup): BlockGroup;
    static fromBlock(block: Block, event?: Event): BlockGroup;
    static fromBlockInfo(blockInfo: BlockInfo, event?: Event): BlockGroup;
}
