import {Name} from "./Name";
import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {LiteralBlock} from "./LiteralBlock";

export class Block{
	name: string;
	template: Template;
	func: Function;
	params: Dict<Block>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		name = Name.randomize(), 
		template = "(( ))", 
		func = new Function, 
		params: object = {},
		pack = new Pack,
		useLiteralParam = false
	){
		this.pack = pack;
		this.useLiteralParam = useLiteralParam;
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
	
	setParam(name: string, value: Block){
		if( this.paramTypes.get(name).check( value.run() ) ){
			Object.defineProperty(this.params.values, name, {get: value.run.bind(value)});
		}else{
			throw Error(`(Block) Type '${value.returnType.name}' is not assignable to type '${this.paramTypes.get(name).name}'`);
		}
	}
	run(e?: any){
		return this.func(this.params.values);
	}
	export(): string{
		return this.template.export();
	}

	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
	static isBlock(value: any): boolean{
		return Type.fromConstructor(Block).check(value);
	}
}