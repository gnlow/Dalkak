import {Name} from "./Name";
import {Vector} from "./Vector";
import {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";
import {Dict} from "./Dict";
import {Util} from "./Util";

interface prop {
	parent?: Dict<any>, 
	name?: string, 
	pos?: Vector, 
	blockGroups?: Array<BlockGroup>, 
	children?: Array<Thing>
}

export class ThingGroup extends Thing{
	name: Name;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	children: Array<Thing>;
	constructor({
		parent = new Dict, 
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups = [], 
		children = []
	}: prop){
		super({parent, name, pos, blockGroups});
		this.children = children;
	}
	addThing(thing: Thing): this{
		this.children.push(thing);
		return this;
	}
}