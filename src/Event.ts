import {Name} from "./Name";
import {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";
import { Dict } from "./Dict";

export class Event{
	name: Name;
	blockGroups: Array<BlockGroup>;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		blockGroups: Array<BlockGroup> = []
	){
		this.name = new Name(parent.namespace, name);
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