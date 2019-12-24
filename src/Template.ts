import {Pack} from "./Pack";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";

type Bracket = "<<" | "((" | "{{";
const paramRule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;

export class Template{
	template: string;
	pack: Pack;
	readonly content: string;
    readonly params: Dict<any>;
    readonly paramTypes: Dict<Type>;
    readonly returnType: Type;
    constructor(template: string, pack: Pack){
		this.template = template;
		this.pack = pack;

		var parsed = this.templateParse();
		this.content = parsed.content;
        this.params = parsed.params;
        this.paramTypes = parsed.paramTypes;
        this.returnType = parsed.returnType;
    }
    templateParse(): {content: string, params: Dict<any>, paramTypes: Dict<Type>, returnType: Type}{
		let {content, returnType} = Template.parseReturnType(this.template, this.pack);
		let {params, paramTypes} = Template.parseParams(content, this.pack);
		return {content, params, paramTypes, returnType};
	}
	export(): string{
		var replaced: string = this.template;
		for(var currentKey in this.paramTypes.values){
			var currentValue = this.params.get(currentKey);
			var template: string;
			if(Block.isBlock(currentValue)){
				template = Template.parseReturnType((currentValue as Block).export(), this.pack).content;
			}else{
				template = currentValue.toString();
			}
			replaced = replaced.replace(paramRule, template);
		}
		return replaced;
	}
	static typeFromBracket(bracket: Bracket): Type{
		switch(bracket){
			case "<<":
				return Type.typeof("boolean");
			case "((":
				return Type.typeof("string");
			case "{{":
				return Type.fromConstructor(Block);
		}
	}
	static isShorthand(template: string){
		return ( template.substring(0,2).search(/(?:<<|\(\(|{{)/) == -1 ) || ( template.substring(template.length-2).search(/(?:>>|\)\)|}})/) == -1);
	}
	static parseReturnType(template: string, pack: Pack){
		if(Template.isShorthand(template)){
			template = `{{${template}}}`;
		}
		var execResult = /(<<|\(\(|{{)(.+)(?:>>|\)\)|}})(?:: *(.+))?/.exec(template) || ["", "((", "", ""];
		var [full, bracket, content, typeLabel] = execResult;
		var returnType: Type;
		if(typeLabel){
			returnType = pack.types.get(typeLabel);
		}else{
			returnType = Template.typeFromBracket(bracket as Bracket);
		}
		return {content, returnType};
	}
	static parseParams(content: string, pack: Pack){
		let params = new Dict<any>();
		let paramTypes = new Dict<Type>();
		
		(content.match(paramRule) || []).forEach(e => {
			paramRule.lastIndex = 0;
			var names = paramRule.exec(e).groups;
			if(names.other){
				params.set(names.other, undefined);
				paramTypes.set(names.other, pack.types.get(names.type));
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
		return {params, paramTypes};
	}
}