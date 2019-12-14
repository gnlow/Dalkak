import {Event} from "./Event";
import {Block} from "./Block";

export class BlockGroup{
	event: Event;
	blocks: Array<Block>;
	constructor(
		event = new Event, 
		blocks: Array<Block> = []
	){
		this.event = event;
		this.blocks = blocks;
	}
	ready(): this{
		this.event.link(this);
		return this;
	}
	start(e: any): this{
		for(var i in this.blocks){
			this.blocks[i].run(e);
		}
		return this;
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup(this.event, this.blocks.concat(blockGroup.blocks));
	}
	static fromBlock(block: Block, event?: Event): BlockGroup{
		return new BlockGroup(event, [block]);
	}
}