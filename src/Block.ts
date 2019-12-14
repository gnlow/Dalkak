import {Name} from "./Name";
import {Template} from "./Template";

export class Block{
	name: string;
	template: Template;
	func: Function;
	params: object;
	paramTypes: object;
	returnType: string;
	constructor(name?: string, template?: string, func?: Function, params?: object){
		this.name = name || Name.randomize();
		this.template = new Template(template || "");
		this.params = this.template.params;
		this.paramTypes = this.template.paramTypes;
		this.setParams(params);
		this.func = func || new Function;
		this.returnType = this.template.returnType;
	}
	setParams(params: object): this{
		this.params = Object.assign(this.params, params);
		return this;
	}
	setParam(name: string, value: any){
		if(typeof value == "object"){
			// Value is block
			if(this.paramTypes[name] == (value as Block).returnType){
				Object.defineProperty(this.params, name, {get: value.run.bind(value)});	
			}else{
				throw Error(`(Block) Type '${value.returnType}' is not assignable to type '${this.paramTypes[name]}'`);
			}
		}else{
			// Value is literal (string, boolean, etc.)
			if(this.paramTypes[name] == typeof value){
				this.params[name] = value;
			}else{
				throw Error(`Type '${typeof value}' is not assignable to type '${this.paramTypes[name]}'`);
			}
		}
	}
	run(e?: any){
		return this.func(this.params);
	}
	
	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
}