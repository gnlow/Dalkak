export default class Param{
	constructor(type, name){
		this.type = type; // String
		this.name = name || Name.randomize();; // String
		this.value = (this.type == "boolean" && new Boolean())
		|| (this.type == "string" && new String())
		|| (this.type == "block" && new Block());
	}
}