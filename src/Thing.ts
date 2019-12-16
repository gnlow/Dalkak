import {Name} from "./Name";
import {Vector} from "./Vector";
import {Block} from "./Block";
import {BlockGroup} from "./BlockGroup";

export class Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor(
		name = Name.randomize(), 
		pos = new Vector(), 
		blockGroups: Array<BlockGroup> = []
	){
		this.name = name;
		this.pos = pos;
		this.blockGroups = blockGroups;
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	static fromBlock(block: Block): Thing{
		return new Thing(undefined, undefined, [BlockGroup.fromBlock(block)]);
	}
}