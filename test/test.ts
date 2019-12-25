import * as dalkak from "../src/dalkak" 

var project = new dalkak.Project();

var types = new dalkak.Dict<dalkak.Type>();
types.set("even", new dalkak.Type("even", v => v%2 == 0))
var pack = new dalkak.Pack("a", new dalkak.Dict, new dalkak.Dict, types);

var start = new dalkak.Event("start");
var log = new dalkak.Block(
    "log", 
    "((text)) 찍기", 
    param => {
        console.log(param.text);
    },
    {
        text: ""
    },
    pack
);

var join = new dalkak.Block(
    "join", 
    "(( ((a: even)) 와 ((b)) 합치기 ))", 
    param => {
        return param.a + param.b;
    },
    {
        a: "Hello, ",
        b: "World!"
    },
    pack
);
var number = new dalkak.LiteralBlock(dalkak.Type.typeof("number"));
var string = new dalkak.LiteralBlock(dalkak.Type.typeof("string"));

var entrybot = dalkak.Thing.fromBlock(log);
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

//console.log(project);
console.log(string.export());
//console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);
//console.log(log.params.text);