import {Name} from "./Name";
import {Vector} from "./Vector";
import {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";
import {Dict} from "./Dict";
import {Util} from "./Util";

export class ThingGroup extends Thing{
	name: Name;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	children: Array<Thing>;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups: Array<BlockGroup> = [], 
		children: Array<Thing> = []
	){
		super(parent, name, pos, blockGroups);
		this.children = children;
	}
	addThing(thing: Thing): this{
		this.children.push(thing);
		return this;
	}
}