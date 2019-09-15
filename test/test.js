const dalkak = require("../dist/dalkak.js");

var project = new dalkak.Project();
var start = new dalkak.Event("start");
var log = new dalkak.Block(
    "log", 
    "((text))를 콘솔에 ((howmany: number))번 찍기", 
    param => {
        for(var i=0;i<param.howmany;i++){
            console.log(param.text);
        }
    },
    {
        text: "hello",
        howmany: 3
    }
);

var entrybot = dalkak.Thing.fromBlock(log, start);

project.addThing(entrybot)

project.ready();
start.fire();
log.setParam("text", "ㅎㅇㅎㅇ")
start.fire();
console.log(project.thingGroup.children[0].blocks[0].blocks[0]);