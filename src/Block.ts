import Name from "./Name";

export default class Block{
	name: string;
	template: string;
	func: Function;
	params: object;
	constructor(name?: string, template?: string, func?: Function, params?: object){
		this.name = name || Name.randomize();
		this.template = template || "";
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>.+?)\)\)|{{(?<block>.+?)}}/g;
		this.params = this.genParams();
		this.setParams(params);
		this.func = func || new Function;
	}
	setParams(params: object): this{
		this.params = Object.assign(this.params, params);
		return this;
	}
	run(e?: any){
		this.func(this.params);
	}
	genParams(): object{
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>.+?)\)\)|{{(?<block>.+?)}}/g;
		var result = {};
		(this.template.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.boolean){
				result[names.boolean] = false;
			}else if(names.string){
				result[names.string] = "";
			}else if(names.block){
				result[names.block] = new Block;
			}
		});
		return result;
	}
	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
}