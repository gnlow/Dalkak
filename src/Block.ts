import {Name} from "./Name";
import {Pack} from "./Pack";
import {Literal} from "./Literal";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {Param} from "./Param";

export class Block{
	name: string;
	template: Template;
	func: Function;
	params: Dict<Param>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		name = Name.randomize(), 
		template = "( )", 
		func = new Function, 
		params: Dict<Param> = {},
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
	
	setParams(params: Dict<Param>): this{
		for(var param in params){
			this.setParam(param, params[param]);
		}
		return this;
	}
	
	setParam(name: string, value: Param){
		if( this.paramTypes[name].check( value.run() ) ){
			this.params[name] = value;
		}else{
			throw Error(`'${value.run()}' is not assignable to type '${this.paramTypes[name].name}'`);
		}
	}
	run(e?: any){
		var params: Dict<Param> = {};
		for(var paramKey in this.params){
			params[paramKey] = this.params[paramKey].run();
		}
		return this.func(params);
	}
	export(): string{
		return this.template.export(this.params);
	}

	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
	static isBlock(value: any): boolean{
		return Type.fromConstructor(Block).check(value);
	}
}