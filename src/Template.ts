import {Pack} from "./Pack";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {Literal} from "./Literal";

type Bracket = "<<" | "((" | "{{";
const paramRule = /<<(?<boolean>.+?)>>|\(\((?<string>[^:]+?)\)\)|{{(?<block>.+?)}}|\(\((?<other>.+?): *(?<type>.+?)\)\)/g;
const parseRule = /(<<|\(\(|{{)(.+)(?:>>|\)\)|}})(?:: *(.+))?(?!.+)/;

export class Template{
	template: string;
	pack: Pack;
	useLiteralParam: boolean;
	readonly content: string;
    readonly params: Dict<any>;
    readonly paramTypes: Dict<Type>;
    readonly returnType: Type;
    constructor(template: string, pack: Pack, useLiteralParam = false){
		this.template = template;
		this.pack = pack;
		this.useLiteralParam = useLiteralParam;

		var parsed = this.templateParse();
		this.content = parsed.content;
        this.params = parsed.params;
        this.paramTypes = parsed.paramTypes;
        this.returnType = parsed.returnType;
    }
    templateParse(): {content: string, params: Dict<any>, paramTypes: Dict<Type>, returnType: Type}{
		let {content, returnType} = Template.parseReturnType(this.template, this.pack);
		let {params, paramTypes} = Template.parseParams(content, this.pack, this.useLiteralParam);
		return {content, params, paramTypes, returnType};
	}
	export(): string{
		var replaced: string = this.template;
		for(var currentKey in this.paramTypes){
			var currentValue = this.params[currentKey];
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
	static isShorthand(template: string): boolean{
		return !parseRule.exec(template);
	}
	static parseReturnType(template: string, pack: Pack){
		if(Template.isShorthand(template)){
			template = `{{${template}}}`;
		}
		var execResult = parseRule.exec(template) || ["", "((", "", ""];
		var [full, bracket, content, typeLabel] = execResult;
		var returnType: Type;
		if(typeLabel){
			returnType = pack.types[typeLabel];
		}else{
			returnType = Template.typeFromBracket(bracket as Bracket);
		}
		return {content, returnType};
	}
	static parseParams(content: string, pack: Pack, useLiteralParam = false){
		let params: Dict<any> = {};
		let paramTypes: Dict<Type> = {};
		(content.match(paramRule) || []).forEach(e => {
			paramRule.lastIndex = 0;
			var names = paramRule.exec(e).groups;
			var paramName = names.other || names.boolean || names.string || names.block;
			var paramType = pack.types[names.type] || Template.typeFromBracket(e.substring(0,2) as Bracket);
			if(useLiteralParam){
				params[paramName] = paramType.initial;
			}else{
				var literal = new Literal(paramType);
				Object.defineProperty(params, paramName, {get: literal.run.bind(literal), configurable: true});
			}
			paramTypes[paramName] = paramType;
		});
		return {params, paramTypes};
	}
}