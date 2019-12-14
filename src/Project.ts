import {Name} from "./Name";
import {Event} from "./Event";
import {BlockSet} from "./BlockSet";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";

export class Project{
	name: string;
	thingGroup: ThingGroup;
	blockSets: Array<BlockSet>;
	events: Array<Event>
	constructor(
		name = Name.randomize(), 
		thingGroup = new ThingGroup("Global"), 
		blockSets: Array<BlockSet> = [],
		events: Array<Event> = []
	){
		this.name = name;
		this.thingGroup = thingGroup;
		this.blockSets = blockSets;
		this.events = events;
	}
	addThing(thing: Thing): this{
		this.thingGroup.addThing(thing);
		return this;
	}
	addEvent(event: Event): this{
		this.events.push(event);
		return this;
	}
}