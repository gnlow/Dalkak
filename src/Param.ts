import Name from "./Name";
import Block from "./Block";

export default class Param{
	type: string;
	name: string;
	value: boolean | string | Block;
	constructor(type: string, name?: string){
		this.type = type;
		this.name = name || Name.randomize();
		this.value = (this.type == "boolean" && Boolean())
		|| (this.type == "string" && String())
		|| (this.type == "block" && new Block());
	}
}