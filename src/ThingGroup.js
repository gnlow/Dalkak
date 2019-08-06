import Thing from "./Thing.js";

export default class ThingGroup extends Thing{
	constructor(name, pos, blocks, children){
		super(name, pos, blocks);
		this.children = children || []; // Array by Thing
	}
	addThing(thing){
		this.children.push(thing);
		return this;
	}
	ready(){
		this.children.forEach(
			child => child.ready()
		);
	}
}