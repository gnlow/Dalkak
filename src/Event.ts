import type {Local} from "./Local";
import {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";
import { Project } from "./Project";
import type { Platform } from "./Platform";

export class Event{
	name: string;
	blockGroups: Array<BlockGroup>;
	constructor(
		name = Util.randString(5), 
		blockGroups: Array<BlockGroup> = []
	){
		this.name = name;
		this.blockGroups = blockGroups;
	}
	link(blockGroup: BlockGroup): this{
		this.blockGroups.push(blockGroup);
		return this;
	}
	fire(project: Project, local?: Local, platform?: Platform): this{
		this.blockGroups.forEach( b => b.run(project, local, platform) );
		return this;
	}
	export(): string{
		return this.blockGroups.map( b => `${this.name} -> \n${Util.indent(b.export())}` ).join("\n");
	}
}