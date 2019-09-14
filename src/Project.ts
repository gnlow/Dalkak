import Name from "./Name";
import BlockSet from "./BlockSet";
import Thing from "./Thing";
import ThingGroup from "./ThingGroup";

export default class Project{
	name: string;
	thingGroup: ThingGroup;
	blockSets: Array<BlockSet>;
	constructor(name?: string, thingGroup?: ThingGroup, blockSets?: Array<BlockSet>){
		this.name = name || Name.randomize();
		this.thingGroup = thingGroup || new ThingGroup("Global");
		this.blockSets = blockSets || [];
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