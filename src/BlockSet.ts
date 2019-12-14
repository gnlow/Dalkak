import {Block} from "./Block";

export class BlockSet{
	name: string;
	infos: Array<Block>;
	events: Array<Event>;
	constructor(
		name = "", 
		infos: Array<Block> = [], 
		events: Array<Event> = []
	){
		this.infos = infos;
		this.events = events;
	}
}