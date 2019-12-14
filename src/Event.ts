import {Name} from "./Name";
import {BlockGroup} from "./BlockGroup";

export class Event{
	name: string;
	blockGroups: Array<BlockGroup>;
	constructor(name?: string, blockGroups?: Array<BlockGroup>){
		this.name = name || Name.randomize();
		this.blockGroups = [];
	}
	link(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	fire(e: any): this{
		for(var i in this.blockGroups){
			this.blockGroups[i].start(e);
		}
		return this;
	}
}