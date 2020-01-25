import {Name} from "./Name";
import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict, Dictable} from "./Dict";
import {Param} from "./Param";
import {Util} from "./Util";

export class Block{
	name: Name;
	template: Template;
	func: (param: any, info?: object) => any;
	params: Dict<Param>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		parent = new Dict, 
		name = Util.randString(5), 
		template = "( )", 
		func = (param: any, info?: object) => {}, 
		params: Dictable<Param> = new Dict,
		pack = new Pack,
		useLiteralParam = false
	){
		this.pack = pack;
		this.useLiteralParam = useLiteralParam;
		this.name = new Name(parent.namespace, name);
		this.template = new Template(template, this.pack);
		this.params = this.template.params;
		this.paramTypes = this.template.paramTypes;
		this.setParams(new Dict(params));
		this.func = func;
		this.returnType = this.template.returnType;
	}
	
	setParams(params: Dict<Param>): this{
		for(var param in params.value){
			this.setParam(param, params.value[param]);
		}
		return this;
	}
	
	setParam(name: string, value: Param): this{
		if( this.paramTypes.value[name].check( value.run() ) ){
			this.params.value[name] = value;
		}else{
			throw Error(`'${value.run()}' is not assignable to type '${this.paramTypes.value[name].name.key}'`);
		}
		return this;
	}
	run(info?: object): any{
		var params: Dict<Param> = new Dict;
		for(var paramKey in this.params.value){
			params.value[paramKey] = this.params.value[paramKey].run();
		}
		return this.func(params.value, info);
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