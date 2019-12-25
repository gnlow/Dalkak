import {Block} from "./Block";
import {Pack} from "./Pack";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class LiteralBlock extends Block{
	params: Dict<any>
	constructor(
		type: Type
	){
        super(
			type.name, 
			`(( ((input: ${type.name})) ))`, 
			params => params.input,
			{},
			new Pack(
				type.name,
				undefined,
				undefined,
				(new Dict<Type>()).set(type.name, type)
			),
			true
		);
	}
	setParam(name: string, value: any){
		if(this.paramTypes.get(name).check(value)){
			this.params.set(name, value);
		}else{
			throw Error(`'${value}' is not assignable to type '${this.paramTypes.get(name).name}'`);
		}
	}
}