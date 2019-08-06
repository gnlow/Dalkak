import BlockGroup from "./BlockGroup";
export default class Event {
    name: string;
    blockGroups: Array<BlockGroup>;
    constructor(name?: string, blockGroups?: Array<BlockGroup>);
    link(blockGroup: BlockGroup): this;
    fire(e: any): this;
}
