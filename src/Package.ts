import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";

export class Package{
	name: string;
	blocks: Array<Block>;
	events: Array<Event>;
	constructor(
		name = Name.randomize(), 
		blocks: Array<Block> = [], 
		events: Array<Event> = []
	){
		this.name = name;
		this.blocks = blocks;
		this.events = events;
	}
}