import Vector from "./Vector";
import BlockGroup from "./BlockGroup";
export default class Thing {
    name: string;
    pos: Vector;
    blocks: Array<BlockGroup>;
    constructor(name?: string, pos?: Vector, blocks?: Array<BlockGroup>);
    addBlock(blockGroup: BlockGroup): this;
    ready(): void;
}
