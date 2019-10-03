const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();
var start = new dalkak.Event("start");
var join = new dalkak.Block(
    "join", 
    "(( Join ((a)) and ((b)) ))", 
    param => {
        return param.a + param.b;
    },
    {
        a: "Hello, ",
        b: "World!"
    }
);

var entrybot = dalkak.Thing.fromBlock(join, start);

project.addThing(entrybot);

//join.setParam("a", "Hello, ");
//join.setParam("b", "World!");

project.ready();

start.fire();
console.log(project.thingGroup.children[0].blocks[0].blocks[0]);