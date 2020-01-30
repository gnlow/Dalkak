import {Vector} from "./Vector";
import {Block} from "./Block";
import {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";

interface prop {
	name?: string, 
	pos?: Vector, 
	blockGroups?: Array<BlockGroup>
}

export class Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor({
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups = []
	}: prop = {}){
		this.name = name;
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