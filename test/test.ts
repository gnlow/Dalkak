import {
    Project,
    Dict,
    Type,
    Pack,
    Event,
    Block,
    Literal,
    Thing
} from "../src/dalkak";

var project = new Project();

var types: Dict<Type> = {};
types.even = new Type("even", v => v%2 == 0, 0);

var number = new Literal(Type.typeof("number"));
var string = new Literal(Type.typeof("string"));
var even = new Literal(types.even);

var pack = new Pack("a", {}, {}, types);

var start = new Event("start");
var log = new Block(
    "log", 
    "(text) 찍기", 
    param => {
        console.log(param.text);
    },
    void 0,
    pack
);

var join = new Block(
    "join", 
    "( (a: even) 와 (b) 합치기 )", 
    param => {
        return param.a + param.b;
    },
    void 0,
    pack
);

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
console.log(log.export());
//console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);
//console.log(log.params.text);