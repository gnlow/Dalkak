import {Name} from "./Name";
import {Block} from "./Block";

export class BlockSet{
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