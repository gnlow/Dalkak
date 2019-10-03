const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();
var start = new dalkak.Event("start");
var square = new dalkak.Block(
    "square", 
    "(( The square of ((a: number)) )): number", 
    param => {
        return param.a**2
    },
    {
        a: 0
    }
);

var entrybot = dalkak.Thing.fromBlock(square, start);

project.addThing(entrybot);

project.ready();

start.fire();
console.log(project.thingGroup.children[0].blocks[0].blocks[0]);