const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();
var start = new dalkak.Event("start");
var log = new dalkak.Block(
    "log", 
    "((text)) 찍기", 
    param => {
        console.log(param.text);
    },
    {
        text: ""
    }
);

var join = new dalkak.Block(
    "join", 
    "(( ((a)) 와 ((b)) 합치기 ))", 
    param => {
        return param.a + param.b;
    },
    {
        a: "Hello, ",
        b: "World!"
    }
);

var entrybot = dalkak.Thing.fromBlock(log, start);

project.addThing(entrybot);
log.setParam("text", join);
//join.setParam("a", 2); // Error: Type 'number' is not assignable to type 'string'
join.setParam("a", "Wow, ");
join.setParam("b", "Dalkak!");
project.ready();

start.fire();

console.log(project.thingGroup.children[0].blockGroups[0].event);
//console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);
//console.log(log.params.text);