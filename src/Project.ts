import {Name} from "./Name";
import {BlockSet} from "./BlockSet";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";

export class Project{
	name: string;
	thingGroup: ThingGroup;
	blockSets: Array<BlockSet>;
	constructor(
		name = Name.randomize(), 
		thingGroup = new ThingGroup("Global"), 
		blockSets: Array<BlockSet> = []
	){
		this.name = name;
		this.thingGroup = thingGroup;
		this.blockSets = blockSets;
	}
	addThing(thing: Thing): this{
		this.thingGroup.addThing(thing);
		return this;
	}
	ready(): this{
		this.thingGroup.ready();
		return this;
	}
}