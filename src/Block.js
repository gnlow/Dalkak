export default class Block{
	constructor(parent, params){
		this.parent = parent || new BlockInfo; // BlockInfo
		this.setParams(params || []); // Array by Param
	}
	setParams(params){
		this.params = Object.assign(this.parent.params, params);
		return this;
	}
	static from(blockInfo){
		return new Block(blockInfo);
	}
}