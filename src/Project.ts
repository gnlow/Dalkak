import {Event} from "./Event";
import {Pack} from "./Pack";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";
import {Dict, Dictable} from "./Dict";
import {Util} from "./Util";
import {Variable} from "./Variable";

interface prop {
	name?: string,
	thingGroup?: ThingGroup,
	packs?: Dictable<Pack>,
	events?: Dictable<Event>,
	variables?: Dictable<Variable>,
}

export class Project{
	name: string;
	thingGroup: ThingGroup;
	pack: Pack;
	events: Dict<Event>;
	variables: Dict<Variable>;
	constructor({
		name = Util.randString(5), 
		thingGroup = new ThingGroup({name: "Global"}), 
		packs = new Dict,
		events = new Dict,
		variables = new Dict,
	}: prop = {}){
		this.name = name;
		this.thingGroup = thingGroup;
		this.pack = new Pack;
		this.mount(...new Dict(packs));
		this.events = new Dict(events);
		this.variables = new Dict(variables);
	}
	run(platform?: object) {
		this.thingGroup.run(this, platform);
	}
	mount(...packs: Pack[]){
		packs.forEach(pack => {
			this.pack = Pack.mix(this.pack, pack);
		});
		return this;
	}
	export(): string{
		return (
`- ${this.name}
${Util.indent( Object.keys(this.events.value).map(e => this.events.value[e].export()).join("\n") )}`
		);
	}
	addThing(thing: Thing): this{
		this.thingGroup.addThing(thing);
		return this;
	}
	addEvent(event: Event): this{
		this.events.value[event.name] = event;
		return this;
	}
}