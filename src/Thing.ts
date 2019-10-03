import Name from "./Name";
import Vector from "./Vector";
import Event from "./Event";
import Block from "./Block";
import BlockGroup from "./BlockGroup";

export default class Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor(name?: string, pos?: Vector, blockGroups?: Array<BlockGroup>){
		this.name = name || Name.randomize();
		this.pos = pos || new Vector();
		this.blockGroups = blockGroups || [];
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	ready(): this{
		this.blockGroups.forEach(
			block => block.ready()
		);
		return this;
	}
	static fromBlock(block: Block, event?: Event): Thing{
		return new Thing(undefined, undefined, [BlockGroup.fromBlock(block, event)]);
	}
}