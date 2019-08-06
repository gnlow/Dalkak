import BlockInfo from "./BlockInfo";
export default class Block {
    parent: BlockInfo;
    params: object;
    constructor(parent?: BlockInfo, params?: object);
    setParams(params: object): this;
    static from(blockInfo: any): Block;
}
