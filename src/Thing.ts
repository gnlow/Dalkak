import {Name} from "./Name";
import {Vector} from "./Vector";
import {Block} from "./Block";
import {BlockGroup} from "./BlockGroup";
import {Dict} from "./Dict";
import {Util} from "./Util";

export class Thing{
	name: Name;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups: Array<BlockGroup> = []
	){
		this.name = new Name(parent.namespace, name);
		this.pos = pos;
		this.blockGroups = blockGroups;
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	static fromBlock(block: Block): Thing{
		return new Thing(undefined, undefined, undefined, [BlockGroup.fromBlock(block)]);
	}
}