import {Name} from "./Name";
import {Event} from "./Event";
import {Pack} from "./Pack";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";
import {Dict} from "./Dict";
import {Util} from "./Util";

export class Project{
	name: string; // Doesn't have to have namespace
	thingGroup: ThingGroup;
	packs: Array<Pack>;
	events: Array<Event>
	constructor(
		name = Util.randString(5), 
		thingGroup = new ThingGroup(new Dict, "Global"), 
		packs: Array<Pack> = [],
		events: Array<Event> = []
	){
		this.name = name;
		this.thingGroup = thingGroup;
		this.packs = packs;
		this.events = events;
	}
	export(): string{
		return (
`- ${this.name}
${Util.indent( this.events.map(e => e.export()).join("\n") )}`
		);
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