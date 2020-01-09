import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {Util} from "./Util";

export class Pack{
	name: Name;
	blocks: Dict<Block>;
	events: Dict<Event>;
	types: Dict<Type>;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		blocks: Dict<Block> = new Dict, 
		events: Dict<Event> = new Dict,
		types: Dict<Type> = new Dict
	){
		this.name = new Name(parent.namespace, name);
		this.blocks = blocks;
		this.events = events;
		this.types = types;
	}
}