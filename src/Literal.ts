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
		this.pack = new Pack({
			name: this.name, 
			types: new Dict({[this.name]: type})
		});
		this.template = new Template(`((input: ${this.name})): ${this.name}`, this.pack, true);
		this.func = (params: {input: any}) => params.input;
		this.params = new Dict({input: type.initial});
		this.paramTypes = new Dict({input: type});
		this.returnType = type;
		this.useLiteralParam = true;
	}
	setParam(name: string, value: any): this{
		if(this.paramTypes.value[name].check(value)){
			this.params.value[name] = value;
		}else{
			throw Error(`'${value}' is not assignable to type '${this.paramTypes.value[name].name}'`);
		}
		return this;
	}
	run(e?: any): any{
		return this.func(this.params.value);
	}
	export(): string{
		return this.template.export(this.params);
	}
	static from(value: any): Literal{
		if(typeof value == "object"){
			return (new Literal(Type.fromConstructor(value.constructor))).setParam("input", value);
		}else{
			return (new Literal(Type.typeof(typeof value))).setParam("input", value);
		}
	}
}