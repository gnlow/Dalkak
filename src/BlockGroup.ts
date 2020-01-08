import {Block} from "./Block";
import {Namespace} from "./Namespace";

export class BlockGroup{
	blocks: Array<Block>;
	namespace: Namespace;
	constructor(
		blocks: Array<Block> = []
	){
		this.blocks = blocks;
		this.namespace = new Namespace;
	}
	start(e: any): this{
		this.blocks.forEach(block => block.run(e));
		return this;
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup(this.blocks.concat(blockGroup.blocks));
	}
	export(): string{
		var exported = "";
		this.blocks.forEach(block => exported += `${block.export()}\n`);
		return exported;
	}
	static fromBlock(block: Block): BlockGroup{
		return new BlockGroup([block]);
	}
}