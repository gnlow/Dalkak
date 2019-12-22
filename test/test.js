const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();

var types = new dalkak.Dict();
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

var entrybot = dalkak.Thing.fromBlock(log);
start.link(entrybot.blockGroups[0]);

project.addThing(entrybot);
console.log(log.paramTypes);
log.setParam("text", join);
//join.setParam("a", 2); // Error: Type 'number' is not assignable to type 'string'
join.setParam("a", 2);
join.setParam("b", "Dalkak!");

start.fire();

console.log(project);
console.log(log.export());
//console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);
//console.log(log.params.text);