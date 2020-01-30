import {
    Project,
    Dict,
    Type,
    Pack,
    Event,
    Block,
    Literal,
    Thing,
    Util
} from "../src/dalkak";

var project = new Project();

var types: Dict<Type> = new Dict;
types.value.even = new Type(new Dict, "even", v => v%2 == 0, 0);

var number = new Literal(Type.typeof("number"));
var string = new Literal(Type.typeof("string"));
var even = new Literal(types.value.even);

var pack = new Pack({
    name: "a",
    types
});

var start = new Event(new Dict, "start");
var log = new Block({
    name: "log", 
    template: "(text) 찍기", 
    func: param => {
        console.log(param.text);
    },
    pack
});

var join = new Block({
    name: "join", 
    template: "( (a: even) 와 (b) 합치기 )", 
    func: param => {
        return param.a + param.b;
    },
    pack
});

var entrybot = Thing.fromBlock(log);
start.link(entrybot.blockGroups[0]);

project.addThing(entrybot);
//console.log(log.paramTypes);
log.setParam("text", join);
//join.setParam("a", 2); // Error: Type 'number' is not assignable to type 'string'
//console.log(number);
number.setParam("input", 2);
string.setParam("input", "Dalkak!");

join.setParam("a", number);
join.setParam("b", string);

//start.fire(0); 
//console.log(join);
//console.log(project);
//console.log(string);
project.addEvent(start);
console.log(project.export());

console.log(Literal.from("a"));
//console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);
//console.log(log.params.text);