import {Block} from "./Block";
import {Pack} from "./Pack";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class LiteralBlock extends Block{
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
			)
		);
	}
}