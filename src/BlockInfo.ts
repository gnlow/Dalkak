import Name from "./Name";
import Block from "./Block";

export default class BlockInfo{
	name: string;
	template: string;
	func: Function;
	params: object;
	constructor(name?: string, template?: string, func?: Function, params?: object){
		this.name = name || Name.randomize();
		this.template = template || "";
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>.+?)\)\)|{{(?<block>.+?)}}/g;
		this.params = this.genParams(rule);
		this.func = func || new Function;
	}
	genParams(rule: RegExp): object{
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
}