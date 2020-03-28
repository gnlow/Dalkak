import {
    Project,
    Dict,
    Type,
    Extension,
    Event,
    Block,
    Literal,
    Thing,
    Variable,
    BlockGroup,
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

var pack = new Extension({
    name: "a",
    types
});
project.mount(pack);

var start = new Event("start");
var log = new Block({
    name: "log", 
    template: "(text) 찍기", 
    func: param => {
        console.log(param.text);
    },
    pack
});

var waitLog = new Block({
    name: "waitLog", 
    template: "{(second: even) 기다리고 (text) 찍기}", 
    func: async param => {
        function wait(s: number) {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve('resolved');
              }, s);
            });
          }
          console.log(param.second)
        await wait(param.second);
        return param.text
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

var entrybot = new Thing({blockGroups: [BlockGroup.fromBlock(log)]})
start.link(entrybot.blockGroups[0]);

project.addThing(entrybot);

log.setParam("text", join);

number.setParam("input", 2);
string.setParam("input", "Dalkak!");

join.setParam("a", number);
join.setParam("b", string);

project.addEvent(start);
console.log(project.export());

var vv = new Variable({type: Type.typeof("number")});
vv.value = 123
console.log(vv)

console.log(project);

string.setParam("input", "LOG");
number.setParam("input", 4000);
waitLog.setParam("second", number);
waitLog.setParam("text", string);

(async () => {
    console.log("test: " + await waitLog.run(project));
})()


var repeat = new Block({
    name: "repeat_basic",
    template: "{ (n) 번 반복하기 {code} }",
    func: async (params, project) => {
        for(var i=0;i<params.n;i++){
            params.code.run();
        }
    }
});

repeat.setParam("n", Literal.from(5).setParam("input", 5));
repeat.setParam("code", waitLog);
console.log(repeat.params)
repeat.run(project)

console.log(project.pack);