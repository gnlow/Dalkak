import {Name} from "./Name";
import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class Block{
	name: string;
	template: Template;
	func: Function;
	params: Dict<any>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	constructor(
		name = Name.randomize(), 
		template = "(( ))", 
		func = new Function, 
		params: object = {},
		pack = new Pack
	){
		this.pack = pack;
		this.name = name;
		this.template = new Template(template, this.pack);
		this.params = this.template.params;
		this.paramTypes = this.template.paramTypes;
		this.setParams(params);
		this.func = func;
		this.returnType = this.template.returnType;
	}
	
	setParams(params: object): this{
		for(var param in params){
			this.params.set(param, params[param]);
		}
		return this;
	}
	
	setParam(name: string, value: any){
		if(Type.fromConstructor(Block).check(value)){
			// Value is block
			if( this.paramTypes.get(name).check( (value as Block).run() ) ){
				Object.defineProperty(this.params.values, name, {get: value.run.bind(value)});	
			}else{
				throw Error(`(Block) Type '${(value as Block).returnType.name}' is not assignable to type '${this.paramTypes.get(name).name}'`);
			}
		}else{
			if(this.paramTypes.get(name).check(value)){
				this.params.set(name, value);
			}else{
				throw Error(`'${value}' is not assignable to type '${this.paramTypes.get(name).name}'`);
			}
		}
	}
	run(e?: any){
		return this.func(this.params.values);
	}
	
	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
}