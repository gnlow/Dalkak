import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class Pack{
	name: string;
	blocks: Dict<Block>;
	events: Dict<Event>;
	types: Dict<Type>;
	constructor(
		name = Name.randomize(), 
		blocks: Dict<Block> = new Dict, 
		events: Dict<Event> = new Dict,
		types: Dict<Type> = new Dict
	){
		this.name = name;
		this.blocks = blocks;
		this.events = events;
		this.types = types;
	}
}