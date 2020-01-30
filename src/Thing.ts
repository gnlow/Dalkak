import {Name} from "./Name";
import {Vector} from "./Vector";
import {Block} from "./Block";
import {BlockGroup} from "./BlockGroup";
import {Dict} from "./Dict";
import {Util} from "./Util";

interface prop {
	parent?: Dict<any>, 
	name?: string, 
	pos?: Vector, 
	blockGroups?: Array<BlockGroup>
}

export class Thing{
	name: Name;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor({
		parent = new Dict, 
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups = []
	}: prop = {}){
		this.name = new Name(parent.namespace, name);
		this.pos = pos;
		this.blockGroups = blockGroups;
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	static fromBlock(block: Block): Thing{
		return new Thing({
			blockGroups: [BlockGroup.fromBlock(block)]
		});
	}
}