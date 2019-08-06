/*jslint plusplus: true */
class Name{
	constructor(name){
		this.name = name || this.randomize();
	}
	static randomize(){
		var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var result = "";
		for(var i=0;i<5;i++){
			result += charSet.charAt(Math.floor(Math.random() * charSet.length));
		}
		return result;
	}
}
class Project{
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
class Thing{
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
class ThingGroup extends Thing{
	constructor(name, pos, blocks, children){
		super(name, pos, blocks);
		this.children = children || []; // Array by Thing
	}
	addThing(thing){
		this.children.push(thing);
		return this;
	}
	ready(){
		this.children.forEach(
			child => child.ready()
		);
	}
}
class Event{
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
class Vector{
	constructor(...poses){
		this.poses = poses || []; // Array
		this.dimension = this.poses.length; // Number
		[this.x, this.y, this.z, this.w] = this.poses; // Number
	}
	rotate(angle = 0){
		angle = angle * Math.PI / 180;
		return new Vector(
			(this.x * Math.cos(angle) - this.y * Math.sin(angle)),
			(this.x * Math.sin(angle) + this.y * Math.cos(angle))
		);
	}
	round(digits = 0){
		return new Vector(...this.poses.map(x => Math.round(x * 10**digits)/10**digits));
	}
}
class Param{
	constructor(type, name){
		this.type = type; // String
		this.name = name || Name.randomize();; // String
		this.value = (this.type == "boolean" && new Boolean())
		|| (this.type == "string" && new String())
		|| (this.type == "block" && new Block());
	}
}
class BlockSet{
	constructor(name, infos, events){
		this.infos = infos || []; // Array by BlockInfo
		this.events = events || []; // Array by Event
	}
}
class BlockInfo{
	constructor(name, template, func){
		this.name = name || Name.randomize(); // String
		this.template = template || ""; // String
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>.+?)\)\)|{{(?<block>.+?)}}/g;
		this.params = this.genParams(rule); // Array by Param
		this.func = func || new Function; // Function
	}
	genParams(rule){
		var result = {};
		(this.template.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.boolean){
				result[names.boolean] = new Param("boolean", names.boolean);
			}else if(names.string){
				result[names.string] = new Param("string", names.string);
			}else if(names.block){
				result[names.block] = new Param("block", names.block);
			}
		});
		return result;
	}
}
class Block{
	constructor(parent, params){
		this.parent = parent || new BlockInfo; // BlockInfo
		this.setParams(params || []); // Array by Param
	}
	setParams(params){
		this.params = Object.assign(this.parent.params, params);
		return this;
	}
	static from(blockInfo){
		return new Block(blockInfo);
	}
}
class BlockGroup{
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

//console.log(new BlockInfo(null, "<<bool>>이 될때까지 ((number))마다 반복하기 {{func}} <<a>>"));
var log = new Event("project_start");
var testset = new BlockSet(
	"testset",
	[
		new BlockInfo(
			"log",
			"테스트 텍스트 출력하기",
			function(){console.log("helloworld")}
		)
	],
	[
		log
	]
)
var hello = new Project(
	"Hello",
	undefined,
	[
		testset
	]
)
//console.log(hello.blockSets[0])

var obj = (new Thing("obj")).addBlock(BlockGroup.from(Block.from(hello.blockSets[0].infos[0])))
//console.log(obj)
hello.addThing(obj)
//console.log(hello.things.children[0].blocks[0])
hello.ready();
log.fire();

console.log(hello.things.children.blocks);