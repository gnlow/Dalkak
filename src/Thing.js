export default class Thing{
	constructor(name, pos, blocks){
		this.name = name || Name.randomize(); // String
		this.pos = pos || new Vector(); // Vector
		this.blocks = blocks || []; // Array by BlockGroup
	}
	addBlock(blockGroup){
		this.blocks.push(blockGroup);
		return this;
	}
	ready(){
		this.blocks.forEach(
			block => block.ready()
		);
	}
}