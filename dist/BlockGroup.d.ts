import Event from "./Event";
import Block from "./Block";
export default class BlockGroup {
    event: Event;
    blocks: Array<Block>;
    constructor(event?: Event, blocks?: Array<Block>);
    ready(): this;
    start(e: any): this;
    attach(blockGroup: BlockGroup): BlockGroup;
    static fromBlock(block: Block, event?: Event): BlockGroup;
}
