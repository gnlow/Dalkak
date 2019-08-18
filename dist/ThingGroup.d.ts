import Vector from "./Vector";
import BlockGroup from "./BlockGroup";
import Thing from "./Thing";
export default class ThingGroup extends Thing {
    name: string;
    pos: Vector;
    blocks: Array<BlockGroup>;
    children: Array<Thing>;
    constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>, children?: Array<Thing>);
    addThing(thing: Thing): this;
    ready(): this;
}
