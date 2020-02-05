import {Block} from "./Block";
import {Project} from "./Project";

interface prop {
	blocks?: Array<Block>,
}

export class BlockGroup {
	blocks: Array<Block>;
	constructor({
		blocks = [],
	}: prop = {}){
		this.blocks = blocks;
	}
	async run(project: Project = new Project, platform?: object) {
		for(var block of this.blocks){
			await block.run(project, platform);
		}
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup({
			blocks: this.blocks.concat(blockGroup.blocks)
		});
	}
	export(): string{
		var exported = "";
		this.blocks.forEach(block => exported += `${block.export()}\n`);
		return exported;
	}
	static fromBlock(block: Block): BlockGroup{
		return new BlockGroup({blocks: [block]});
	}
}