import BlockSet from "./BlockSet";
import Thing from "./Thing";
import ThingGroup from "./ThingGroup";
export default class Project {
    name: string;
    things: ThingGroup;
    blockSets: Array<BlockSet>;
    constructor(name?: string, things?: ThingGroup, blockSets?: Array<BlockSet>);
    addThing(thing: Thing): this;
    ready(): this;
}
