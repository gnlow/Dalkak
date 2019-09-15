import Name from "./Name";

export default class Block{
	name: string;
	template: string;
	func: Function;
	params: object;
	types: object;
	constructor(name?: string, template?: string, func?: Function, params?: object){
		this.name = name || Name.randomize();
		this.template = template || "";
		var templateParse = this.templateParse();
		this.params = templateParse.params;
		this.types = templateParse.types;
		this.setParams(params);
		this.func = func || new Function;
		
	}
	setParams(params: object): this{
		this.params = Object.assign(this.params, params);
		return this;
	}
	setParam(name: string, value: any){
		this.params[name] = value;
	}
	run(e?: any){
		this.func(this.params);
	}
	templateParse(): {params: object, types: object}{
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;
		var params = {};
		var types = {};
		(this.template.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.other){
				params[names.other] = undefined;
				types[names.other] = names.type;
			}else if(names.boolean){
				params[names.boolean] = false;
				types[names.boolean] = "boolean";
			}else if(names.string){
				params[names.string] = "";
				types[names.string] = "string";
			}else if(names.block){
				params[names.block] = new Block;
				types[names.block] = "block";
			}
		});
		return {params, types};
	}
	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
}