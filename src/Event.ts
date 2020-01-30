import {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";

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
	fire(e: any): this{
		this.blockGroups.forEach( b => b.start(e) );
		return this;
	}
	export(): string{
		return this.blockGroups.map( b => `${this.name} -> \n${Util.indent(b.export())}` ).join("\n");
	}
}