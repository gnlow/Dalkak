import {Pack} from "./Pack";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";

export class Template{
	template: string;
	pack: Pack;
    readonly params: Dict<any>;
    readonly paramTypes: Dict<Type>;
    readonly returnType: Type;
    constructor(template: string, pack: Pack){
		this.template = template;
		this.pack = pack;

        var parsed = this.templateParse();
        this.params = parsed.params;
        this.paramTypes = parsed.paramTypes;
        this.returnType = parsed.returnType;
    }
    templateParse(): {params: Dict<any>, paramTypes: Dict<Type>, returnType: Type}{
		const returnRule = /(<<|\(\(|{{)(.+)(?:>>|\)\)|}})(?:: *(.+))?/;
		const bracketType = {"<<": "boolean", "((": "string", "{{": "block"};
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;
		let params = new Dict<any>();
		let paramTypes = new Dict<Type>();
		let returnExec;
		let returnType: Type;
		let content;
		if(this.template.split(/(?:<<|\(\(|{{)/).slice(1).findIndex(str => str.search(/(?:>>|\)\)|}})/) == -1) == -1){ 
			// No returnType bracket
			returnType = Type.fromConstructor(Block);
			content = this.template;
		}else{
			returnExec = returnRule.exec(this.template);
			if(returnExec[3]){
				// Other Types
				returnType = this.pack.types.get(returnExec[3]);
			}else{
				returnType = Type.typeof(bracketType[returnExec[1]]);
			}
			content = returnExec[2];
		}
		
		(content.match(rule) || []).forEach(e => {
			rule.lastIndex = 0;
			var names = rule.exec(e).groups;
			if(names.other){
				params.set(names.other, undefined);
				paramTypes.set(names.other, this.pack.types.get(names.type));
			}else if(names.boolean){
				params.set(names.boolean, false);
				paramTypes.set(names.boolean, Type.typeof("boolean"));
			}else if(names.string){
				params.set(names.string, "");
				paramTypes.set(names.string, Type.typeof("string"));
			}else if(names.block){
				params.set(names.block, new Block);
				paramTypes.set(names.block, Type.fromConstructor(Block));
			}
		});
		return {params, paramTypes, returnType};
    }
}