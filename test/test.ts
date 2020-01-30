import {
    Project,
    Dict,
    Type,
    Pack,
    Event,
    Block,
    Literal,
    Thing,
} from "../src/dalkak";

var project = new Project();

var types: Dict<Type> = new Dict;
types.value.even = new Type({
    name: "even", 
    checker: v => v%2 == 0, 
    initial: 0
});

var number = new Literal(Type.typeof("number"));
var string = new Literal(Type.typeof("string"));
var even = new Literal(types.value.even);

var pack = new Pack({
    name: "a",
    types
});

var start = new Event("start");
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

log.setParam("text", join);

number.setParam("input", 2);
string.setParam("input", "Dalkak!");

join.setParam("a", number)
    .setParam("b", string);

project.addEvent(start);
console.log(project.export());

console.log(Literal.from("a"));

console.log(Literal.from("a").paramTypes);