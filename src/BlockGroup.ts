import Event from "./Event";
import Block from "./Block";
import BlockInfo from "./BlockInfo";

export default class BlockGroup{
	event: Event;
	blocks: Array<Block>;
	constructor(event?: Event, blocks?: Array<Block>){
		this.event = event || new Event;
		this.blocks = blocks || [];
	}
	ready(): this{
		this.event.link(this);
		return this;
	}
	start(e: any): this{
		for(var i in this.blocks){
			this.blocks[i].parent.func(e);
		}
		return this;
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup(this.event, this.blocks.concat(blockGroup.blocks));
	}
	static fromBlock(block: Block, event?: Event): BlockGroup{
		return new BlockGroup(event, [block]);
	}
	static fromBlockInfo(blockInfo: BlockInfo, event?: Event): BlockGroup{
		return BlockGroup.fromBlock(Block.fromBlockInfo(blockInfo), event);
	}
}