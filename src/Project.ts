import {Event} from "./Event";
import {Pack} from "./Pack";
import {Thing} from "./Thing";
import {ThingGroup} from "./ThingGroup";
import {Dict, Dictable} from "./Dict";
import {Util} from "./Util";
import {Variable} from "./Variable";
import { Extension } from "./Extension";
import { Local } from "./Local";

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

	projectEvents: {
		[name: string]: ((project: Project) => void)[]
	}
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
		this.projectEvents = {
			run: [],
			stop: [],
			mount: [],
		};
	}
	run() {
		this.fire("run");
		let local = new Local(this.variables);
		local.dive(this);
		this.thingGroup.run(this, local);
	}
	mount(...packs: Pack[]){
		packs.forEach(pack => {
			this.pack = Pack.mix(this.pack, pack);
			if(pack instanceof Extension){
				pack.on.mount && pack.on.mount(this);
				this.on("run", pack.on.run?.bind(pack));
				this.on("stop", pack.on.stop?.bind(pack)); // 아직 미구현
			}
		});
		return this;
	}
	export(): string{
		return (
`- ${this.name}
${Util.indent( Object.keys(this.events.value).map(e => this.events.value[e].export()).join("\n") )}`
		);
	}
	addThing(...things: Thing[]): this{
		this.thingGroup.addThing(...things);
		return this;
	}
	addEvent(...events: Event[]): this{
		events.forEach(event => {
			this.events.value[event.name] = event;
		});
		return this;
	}
	on(name: string, callback?: (project: Project) => void){
		callback && this.projectEvents[name]?.push(callback);
	}
	fire(name: string){
		this.projectEvents[name].forEach(callback => {
			callback(this);
		});
	}
}