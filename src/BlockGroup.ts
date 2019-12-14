import {Event} from "./Event";
import {Block} from "./Block";

export class BlockGroup{
	blocks: Array<Block>;
	constructor(
		blocks: Array<Block> = []
	){
		this.blocks = blocks;
	}
	start(e: any): this{
		for(var i in this.blocks){
			this.blocks[i].run(e);
		}
		return this;
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup(this.blocks.concat(blockGroup.blocks));
	}
	static fromBlock(block: Block): BlockGroup{
		return new BlockGroup([block]);
	}
}