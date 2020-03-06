import {Vector} from "./Vector";
import type {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";
import {Util} from "./Util";
import {Project} from "./Project";

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
	run(project: Project = new Project, platform?: object) {
		this.blockGroups.forEach((blockGroup) => {
			blockGroup.run(project, platform);
		});
		this.children.forEach(thing => {
			thing.run(project, platform);
		});
	}
	addThing(...things: Thing[]): this{
		things.forEach(thing => {
			this.children.push(thing);
		});
		return this;
	}
}