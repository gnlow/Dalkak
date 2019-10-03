const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();
var start = new dalkak.Event("start");
var move = new dalkak.Block(
    "move", 
    "Move ((walks: number)) steps", 
    param => {
        for(var i=1;i<=param.walks;i++)
            console.log(`${i} step${i==1?"":"s"}`);
    },
    {
        walks: 0
    }
);

var entrybot = dalkak.Thing.fromBlock(move, start);

project.addThing(entrybot);
move.setParam("walks", 10)
project.ready();

start.fire();
console.log(project.thingGroup.children[0].blockGroups[0].blocks[0]);