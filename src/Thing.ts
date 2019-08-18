import Name from "./Name";
import Vector from "./Vector";
import Event from "./Event";
import BlockInfo from "./BlockInfo";
import Block from "./Block";
import BlockGroup from "./BlockGroup";

export default class Thing{
	name: string;
	pos: Vector;
	blocks: Array<BlockGroup>;
	constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>){
		this.name = name || Name.randomize();
		this.pos = pos || new Vector();
		this.blocks = blocks || [];
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blocks.push(blockGroup);
		return this;
	}
	ready(): this{
		this.blocks.forEach(
			block => block.ready()
		);
		return this;
	}
	static fromBlock(block: Block, event?: Event): Thing{
		return new Thing(undefined, undefined, [BlockGroup.fromBlock(block, event)]);
	}
	static fromBlockInfo(blockInfo: BlockInfo, event?: Event): Thing{
		return Thing.fromBlock(Block.fromBlockInfo(blockInfo), event);
	}
}