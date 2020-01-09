import {Name} from "./Name";
import {Pack} from "./Pack";
import {Template} from "./Template";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class Literal{
	name: Name;
	template: Template;
	func: Function;
	params: Dict<any>;
	pack: Pack;
	paramTypes: Dict<Type>;
	returnType: Type;
	useLiteralParam: boolean;
	constructor(
		type: Type,
		parent = new Dict
	){
		this.name = new Name(parent.namespace, type.name);
		this.pack = new Pack(new Dict, this.name.key, new Dict, new Dict, new Dict({[this.name.key]: type}));
		this.template = new Template(`((input: ${this.name})): ${this.name}`, this.pack, true);
		this.func = params => params.input;
		this.params = new Dict({input: type.initial});
		this.paramTypes = new Dict({input: type});
		this.returnType = type;
		this.useLiteralParam = true;
	}
	setParam(name: string, value: any){
		if(this.paramTypes.value[name].check(value)){
			this.params.value[name] = value;
		}else{
			throw Error(`'${value}' is not assignable to type '${this.paramTypes.value[name].name}'`);
		}
	}
	run(e?: any){
		return this.func(this.params.value);
	}
	export(): string{
		return this.template.export(this.params);
	}
}