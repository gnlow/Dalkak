import Name from "./Name";
import Vector from "./Vector";
import BlockGroup from "./BlockGroup";

export default class Thing{
	name: string;
	pos: Vector;
	blocks: Array<BlockGroup>;
	constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>){
		this.name = name || Name.randomize();
		this.pos = pos || new Vector();
		this.blocks = blocks || [];
	}
	addBlock(blockGroup: BlockGroup){
		this.blocks.push(blockGroup);
		return this;
	}
	ready(){
		this.blocks.forEach(
			block => block.ready()
		);
	}
}