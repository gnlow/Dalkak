import {Name} from "./Name";
import {Vector} from "./Vector";
import {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";

export class ThingGroup extends Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	children: Array<Thing>;
	constructor(
		name = Name.randomize(), 
		pos = new Vector(), 
		blockGroups: Array<BlockGroup> = [], 
		children: Array<Thing> = []
	){
		super(name, pos, blockGroups);
		this.children = children;
	}
	addThing(thing: Thing): this{
		this.children.push(thing);
		return this;
	}
}