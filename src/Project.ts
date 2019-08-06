import Name from "./Name";
import BlockSet from "./BlockSet";
import Thing from "./Thing";
import ThingGroup from "./ThingGroup";

export default class Project{
	name: string;
	things: ThingGroup;
	blockSets: Array<BlockSet>;
	constructor(name?: string, things?: ThingGroup, blockSets?: Array<BlockSet>){
		this.name = name || Name.randomize();
		this.things = things || new ThingGroup("Global");
		this.blockSets = blockSets || [];
	}
	addThing(thing: Thing){
		this.things.addThing(thing);
		return this;
	}
	ready(){
		this.things.ready();
	}
}