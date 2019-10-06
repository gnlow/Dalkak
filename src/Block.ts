import Name from "./Name";

export default class Block{
	name: string;
	template: string;
	func: Function;
	params: object;
	paramTypes: object;
	returnType: string;
	constructor(name?: string, template?: string, func?: Function, params?: object){
		this.name = name || Name.randomize();
		this.template = template || "";
		let templateParse = this.templateParse();
		this.params = templateParse.params;
		this.paramTypes = templateParse.paramTypes;
		this.setParams(params);
		this.func = func || new Function;
		this.returnType = templateParse.returnType;
	}
	setParams(params: object): this{
		this.params = Object.assign(this.params, params);
		return this;
	}
	setParam(name: string, value: any){
		if(typeof value == "object"){
			// Value is block
			if(this.paramTypes[name] == (value as Block).returnType){
				Object.defineProperty(this.params, name, {get: value.run.bind(value)});	
			}else{
				throw Error(`(Block) Type '${value.returnType}' is not assignable to type '${this.paramTypes[name]}'`);
			}
		}else{
			// Value is literal (string, boolean, etc.)
			if(this.paramTypes[name] == typeof value){
				this.params[name] = value;
			}else{
				throw Error(`Type '${typeof value}' is not assignable to type '${this.paramTypes[name]}'`);
			}
		}
	}
	run(e?: any){
		return this.func(this.params);
	}
	templateParse(): {params: object, paramTypes: object, returnType: string}{
		const returnRule = /(<<|\(\(|{{)(.+)(?:>>|\)\)|}})(?:: *(.+))?/;
		const bracketType = {"<<": "boolean", "((": "string", "{{": "block"};
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;
		let params = {};
		let paramTypes = {};
		let returnExec;
		let returnType;
		let content;
		if(this.template.split(/(?:<<|\(\(|{{)/).slice(1).findIndex(str => str.search(/(?:>>|\)\)|}})/) == -1) == -1){ 
			// No returnType bracket
			returnType = "block";
			content = this.template;
		}else{
			returnExec = returnRule.exec(this.template);
			returnType = returnExec[3] || bracketType[returnExec[1]];
			content = returnExec[2];
		}
		
		(content.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.other){
				params[names.other] = undefined;
				paramTypes[names.other] = names.type;
			}else if(names.boolean){
				params[names.boolean] = false;
				paramTypes[names.boolean] = "boolean";
			}else if(names.string){
				params[names.string] = "";
				paramTypes[names.string] = "string";
			}else if(names.block){
				params[names.block] = new Block;
				paramTypes[names.block] = "block";
			}
		});
		return {params, paramTypes, returnType};
	}
	static fromBlock(block: Block): Block{
		return Object.assign(new Block(), block);
	}
}