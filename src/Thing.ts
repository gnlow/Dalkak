import {Vector} from "./Vector";
import {Block} from "./Block";
import type {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";
import {Project} from "./Project";

interface prop {
	name?: string, 
	pos?: Vector, 
	blockGroups?: Array<BlockGroup>
}

export class Thing{
	name: string;
	pos: Vector;
	blockGroups: Array<BlockGroup>;
	constructor({
		name = Util.randString(5), 
		pos = new Vector(), 
		blockGroups = []
	}: prop = {}){
		this.name = name;
		this.pos = pos;
		this.blockGroups = blockGroups;
	}
	run(project: Project = new Project, platform?: object) {
		this.blockGroups.forEach((blockGroup) => {
			blockGroup.run(project, platform);
		});
	}
	addBlock(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
}