export default class BlockInfo{
	constructor(name, template, func){
		this.name = name || Name.randomize(); // String
		this.template = template || ""; // String
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>.+?)\)\)|{{(?<block>.+?)}}/g;
		this.params = this.genParams(rule); // Array by Param
		this.func = func || new Function; // Function
	}
	genParams(rule){
		var result = {};
		(this.template.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.boolean){
				result[names.boolean] = new Param("boolean", names.boolean);
			}else if(names.string){
				result[names.string] = new Param("string", names.string);
			}else if(names.block){
				result[names.block] = new Param("block", names.block);
			}
		});
		return result;
	}
}