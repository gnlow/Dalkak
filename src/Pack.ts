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
		blocks: Dict<Block> = {}, 
		events: Dict<Event> = {},
		types: Dict<Type> = {}
	){
		this.name = name;
		this.blocks = blocks;
		this.events = events;
		this.types = types;
	}
}