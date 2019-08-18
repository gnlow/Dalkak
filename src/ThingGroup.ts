import Vector from "./Vector";
import BlockGroup from "./BlockGroup";
import Thing from "./Thing";

export default class ThingGroup extends Thing{
	name: string;
	pos: Vector;
	blocks: Array<BlockGroup>;
	children: Array<Thing>;
	constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>, children?: Array<Thing>){
		super(name, pos, blocks);
		this.children = children || [];
	}
	addThing(thing: Thing): this{
		this.children.push(thing);
		return this;
	}
	ready(): this{
		this.children.forEach(
			child => child.ready()
		);
		return this;
	}
}