export default class Project{
	constructor(name, things, blockSets){
		this.name = name || Name.randomize(); // String
		this.things = things || new ThingGroup("Global"); // ThingGroup
		this.blockSets = blockSets || []; // Array by BlockSet
	}
	addThing(thing){
		this.things.addThing(thing);
		return this;
	}
	ready(){
		this.things.ready();
	}
}