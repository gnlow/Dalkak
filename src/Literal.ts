import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class Literal{
	name: string;
	template: Template;
	func: Function;
	params: Dict<any>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		type: Type
	){
		this.name = type.name;
		this.pack = new Pack(this.name, {}, {}, {[this.name]: type});
		this.template = new Template(`((input: ${this.name})): ${this.name}`, this.pack, true);
		this.func = params => params.input;
		this.params = {input: type.initial};
		this.paramTypes = {input: type};
		this.returnType = type;
		this.useLiteralParam = true;
	}
	setParam(name: string, value: any){
		if(this.paramTypes[name].check(value)){
			this.params[name] = value;
		}else{
			throw Error(`'${value}' is not assignable to type '${this.paramTypes[name].name}'`);
		}
	}
	run(e?: any){
		return this.func(this.params);
	}
	export(): string{
		return this.template.export(this.params);
	}
}