import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict, Dictable} from "./Dict";
import {Param} from "./Param";
import {Util} from "./Util";
import {Project} from "./Project";

interface prop {
	name?: string, 
	template?: string, 
	func?: (param: any, project: Project, platform?: object) => any, 
	params?: Dictable<Param>,
	pack?: Pack,
	useLiteralParam?: boolean
}

export class Block{
	name: string;
	template: Template;
	func: (param: any, project: Project, platform?: object) => any;
	params: Dict<Param>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor({
		name = Util.randString(5), 
		template = "( )", 
		func = (param: any, project: Project, platform?: object) => {},
		params = new Dict,
		pack = new Pack,
		useLiteralParam = false
	}: prop = {}){
		this.pack = pack;
		this.useLiteralParam = useLiteralParam;
		this.name = name;
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
			throw Error(`'${value.run()}' is not assignable to type '${this.paramTypes.value[name].name}'`);
		}
		return this;
	}
	run(project: Project = new Project, platform?: object): any{
		var params: Dict<Param> = new Dict;
		for(var paramKey in this.params.value){
			params.value[paramKey] = this.params.value[paramKey].run();
		}
		return this.func(params.value, project, platform);
	}
	export(): string{
		return this.template.export(this.params);
	}

	static fromBlock(block: Block): Block{
		return Object.assign(new Block, block);
	}
	static isBlock(value: any): boolean{
		return Type.fromConstructor(Block).check(value);
	}
}