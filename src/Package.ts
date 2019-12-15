import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";

export class Package{
	name: string;
	infos: Array<Block>;
	events: Array<Event>;
	constructor(
		name = Name.randomize(), 
		infos: Array<Block> = [], 
		events: Array<Event> = []
	){
		this.name = name;
		this.infos = infos;
		this.events = events;
	}
}