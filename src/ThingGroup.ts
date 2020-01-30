import {Vector} from "./Vector";
import {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";
import {Util} from "./Util";

interface prop {
	name?: string, 
	pos?: Vector, 
	blockGroups?: Array<BlockGroup>, 
	children?: Array<Thing>
}

export class ThingGroup extends Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	children: Array<Thing>;
	constructor({
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups = [], 
		children = []
	}: prop){
		super({name, pos, blockGroups});
		this.children = children;
	}
	addThing(thing: Thing): this{
		this.children.push(thing);
		return this;
	}
}