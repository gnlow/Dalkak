import {Vector} from "./Vector";
import type {BlockGroup} from "./BlockGroup";
import {Thing} from "./Thing";
import {Util} from "./Util";
import type {Project} from "./Project";
import type { Local } from "./Local";
import type { Platform } from "./Platform";

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
	run(project: Project, local: Local, platform?: Platform) {
		local = local.dive(this);
		this.blockGroups.forEach((blockGroup) => {
			blockGroup.run(project, local, platform);
		});
		this.children.forEach(thing => {
			thing.run(project, local, platform);
		});
	}
	addThing(...things: Thing[]): this{
		things.forEach(thing => {
			this.children.push(thing);
		});
		return this;
	}
}