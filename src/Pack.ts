import {Event} from "./Event";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict, Dictable} from "./Dict";
import {Util} from "./Util";

interface prop {
	name?: string, 
	blocks?: Dictable<Block>, 
	events?: Dictable<Event>,
	types?: Dictable<Type>
}

export class Pack{
	name: string;
	blocks: Dict<Block>;
	events: Dict<Event>;
	types: Dict<Type>;
	constructor({
		name = Util.randString(5), 
		blocks = new Dict, 
		events = new Dict,
		types = new Dict
	}: prop = {}){
		this.name = name;
		this.blocks = new Dict(blocks);
		this.events = new Dict(events);
		this.types = new Dict(types);
	}
}