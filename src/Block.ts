import BlockInfo from "./BlockInfo";

export default class Block{
	parent: BlockInfo;
	params: object;
	constructor(parent?: BlockInfo, params?: object){
		this.parent = parent || new BlockInfo;
		this.setParams(params || []);
	}
	setParams(params: object): this{
		this.params = Object.assign(this.parent.params, params);
		return this;
	}
	static fromBlockInfo(blockInfo: BlockInfo): Block{
		return new Block(blockInfo);
	}
}