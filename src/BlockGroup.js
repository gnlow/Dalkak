export default class BlockGroup{
	constructor(event, blocks){
		this.event = event || new Event; // Event
		this.blocks = blocks || []; // Array by Block
	}
	ready(){
		this.event.link(this); // Event.link
		return this;
	}
	start(e){
		for(var i in this.blocks){
			this.blocks[i].func();
		}
		return this;
	}
	attach(blockGroup){
		return new BlockGroup(this.event, this.blocks.concat(blockGroup.blocks));
	}
	static from(block){
		return new BlockGroup(undefined, [block]);
	}
}