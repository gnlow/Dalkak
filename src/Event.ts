import {Name} from "./Name";
import {BlockGroup} from "./BlockGroup";

export class Event{
	name: string;
	blockGroups: Array<BlockGroup>;
	constructor(
		name = Name.randomize(), 
		blockGroups: Array<BlockGroup> = []
	){
		this.name = name;
		this.blockGroups = blockGroups;
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