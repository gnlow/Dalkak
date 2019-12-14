import {Block} from "./Block";

export class Template{
    template: string;
    readonly params: object;
    readonly paramTypes: object;
    readonly returnType: string;
    constructor(template = ""){
        this.template = template;

        var parsed = this.templateParse();
        this.params = parsed.params;
        this.paramTypes = parsed.paramTypes;
        this.returnType = parsed.returnType;
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
}