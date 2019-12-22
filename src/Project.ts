import {Name} from "./Name";
import {Event} from "./Event";
import {Pack} from "./Pack";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";

export class Project{
	name: string;
	thingGroup: ThingGroup;
	packs: Array<Pack>;
	events: Array<Event>
	constructor(
		name = Name.randomize(), 
		thingGroup = new ThingGroup("Global"), 
		packs: Array<Pack> = [],
		events: Array<Event> = []
	){
		this.name = name;
		this.thingGroup = thingGroup;
		this.packs = packs;
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