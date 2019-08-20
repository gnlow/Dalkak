import BlockInfo from "./BlockInfo";
export default class Block {
    parent: BlockInfo;
    params: object;
    constructor(parent?: BlockInfo, params?: object);
    setParams(params: object): this;
    run(e?: any): void;
    static fromBlockInfo(blockInfo: BlockInfo): Block;
}
