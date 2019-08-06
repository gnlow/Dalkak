export default class Event{
	constructor(name){
		this.name = name || Name.randomize(); // String
		this.blockGroups = []; // Array by BlockGroup
	}
	link(blockGroup){
		this.blockGroups.push(blockGroup);
		return this;
	}
	fire(e){
		for(var i in this.blockGroups){
			this.blockGroups[i].start(e);
		}
		return this;
	}
}