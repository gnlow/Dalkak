import {Pack} from "./Pack";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";

type Bracket = "<<" | "((" | "{{";

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
		const rule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;
		let params = new Dict<any>();
		let paramTypes = new Dict<Type>();
		let {content, returnType} = Template.parseReturnType(this.template, this.pack);
		
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
	static typeFromBracket(bracket: Bracket): Type{
		return {
			"<<": Type.typeof("boolean"), 
			"((": Type.typeof("string"), 
			"{{": Type.fromConstructor(Block)
		}[bracket];
	}
	static isShorthand(template: string){
		return template.split(/(?:<<|\(\(|{{)/).slice(1).findIndex(str => str.search(/(?:>>|\)\)|}})/) == -1) == -1;
	}
	static parseReturnType(template: string, pack: Pack){
		if(Template.isShorthand(template)){
			template = `{{${template}}}`;
		}
		var execResult = /(<<|\(\(|{{)(.+)(?:>>|\)\)|}})(?:: *(.+))?/.exec(template);
		var [full, bracket, content, typeLabel] = execResult;
		var returnType: Type;
		if(typeLabel){
			returnType = pack.types.get(typeLabel);
		}else{
			returnType = Template.typeFromBracket(bracket as Bracket);
		}
		return {content, returnType};
	}
}