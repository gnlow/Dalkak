import {Name} from "./Name";
import {Event} from "./Event";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict, Dictable} from "./Dict";
import {Util} from "./Util";

export class Pack{
	name: Name;
	blocks: Dict<Block>;
	events: Dict<Event>;
	types: Dict<Type>;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		blocks: Dictable<Block> = new Dict, 
		events: Dictable<Event> = new Dict,
		types: Dictable<Type> = new Dict
	){
		this.name = new Name(parent.namespace, name);
		this.blocks = new Dict(blocks);
		this.events = new Dict(events);
		this.types = new Dict(types);
	}
}