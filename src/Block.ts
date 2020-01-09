import {Name} from "./Name";
import {Pack} from "./Pack";
import {Literal} from "./Literal";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {Param} from "./Param";
import {BlockGroup} from "./BlockGroup";
import {Util} from "./Util";

export class Block{
	parent: Dict<Block>;
	name: Name;
	template: Template;
	func: Function;
	params: Dict<Param>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		template = "( )", 
		func = new Function, 
		params: Dict<Param> = new Dict,
		pack = new Pack,
		useLiteralParam = false
	){
		this.pack = pack;
		this.useLiteralParam = useLiteralParam;
		this.name = new Name(parent.namespace,name);
		this.template = new Template(template, this.pack);
		this.params = this.template.params;
		this.paramTypes = this.template.paramTypes;
		this.setParams(params);
		this.func = func;
		this.returnType = this.template.returnType;
	}
	
	setParams(params: Dict<Param>): this{
		for(var param in params){
			this.setParam(param, params.value[param]);
		}
		return this;
	}
	
	setParam(name: string, value: Param){
		if( this.paramTypes.value[name].check( value.run() ) ){
			this.params.value[name] = value;
		}else{
			throw Error(`'${value.run()}' is not assignable to type '${this.paramTypes.value[name].name}'`);
		}
	}
	run(e?: any){
		var params: Dict<Param> = {};
		for(var paramKey in this.params){
			params.value[paramKey] = this.params.value[paramKey].run();
		}
		return this.func(params.value);
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