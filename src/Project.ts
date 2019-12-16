import {Name} from "./Name";
import {Event} from "./Event";
import {Package} from "./Package";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";

export class Project{
	name: string;
	thingGroup: ThingGroup;
	packages: Array<Package>;
	events: Array<Event>
	constructor(
		name = Name.randomize(), 
		thingGroup = new ThingGroup("Global"), 
		packages: Array<Package> = [],
		events: Array<Event> = []
	){
		this.name = name;
		this.thingGroup = thingGroup;
		this.packages = packages;
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