import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";
import {Type} from "./Type";

export class Package{
	name: string;
	blocks: Array<Block>;
	events: Array<Event>;
	types: Array<Type>;
	constructor(
		name = Name.randomize(), 
		blocks: Array<Block> = [], 
		events: Array<Event> = [],
		types: Array<Type> = []
	){
		this.name = name;
		this.blocks = blocks;
		this.events = events;
		this.types = types;
	}
}