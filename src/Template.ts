import {Pack} from "./Pack";
import {Block} from "./Block";
import {Type} from "./Type";
import {Dict} from "./Dict";
import {Literal} from "./Literal";

type Bracket = "<" | "(" | "{";
const paramRule = /(?:<|\(|\{)(?<paramName>.+?)(?:: *(?<type>.+?))?(?:>|\)|\})/g;
const parseRule = /(<|\(|{)(.+)(?:>|\)|})(?:: *(.+))?(?!.+)/;

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
	export(params: Dict<any>): string{
		var paramReplace = this.content.match(paramRule) || [];
		var replaced: string = this.content;
		var index = 0;
		params.forEach((currentValue, currentKey) => {
			var template: string;
			if(currentValue.constructor == Block || currentValue.constructor == Literal){
				template = Template.addBracket((currentValue as Block).export(), (currentValue as Block).returnType);
			}else{
				template = Template.addBracket(currentValue.toString(), this.paramTypes.value[currentKey]);
			}
			replaced = replaced.replace(paramReplace[index], template);
			index++;
		});
		return replaced;
	}
	static typeFromBracket(bracket: Bracket): Type{
		switch(bracket){
			case "<":
				return Type.typeof("boolean", Boolean);
			case "(":
				return Type.typeof("string", String);
			case "{":
				return Type.fromConstructor(Block);
		}
	}
	static addBracket(value: string, type: Type): string{
		switch(type.name){
			case "boolean":
				return `<${value}>`;
			case "string":
				return `(${value})`;
			case "Block":
				return `{${value}}`;
			default:
				return `(${value}: ${type.name})`

		}
	}
	static isShorthand(template: string): boolean{
		return !parseRule.exec(template);
	}
	static parseReturnType(template: string, pack: Pack){
		if(Template.isShorthand(template)){
			template = `{${template}}`;
		}
		var execResult = parseRule.exec(template) || ["", "(", "", ""];
		var [full, bracket, content, typeLabel] = execResult;
		var returnType: Type;
		if(typeLabel){
			returnType = pack.types.value[typeLabel];
		}else{
			returnType = Template.typeFromBracket(bracket as Bracket);
		}
		return {content, returnType};
	}
	static parseParams(content: string, pack: Pack, useLiteralParam = false){
		let params: Dict<any> = new Dict;
		let paramTypes: Dict<Type> = new Dict;
		(content.match(paramRule) || []).forEach(e => {
			paramRule.lastIndex = 0;
			var names = paramRule.exec(e)?.groups || {};
			var paramName = names.paramName;
			var paramType = pack.types.value[names.type] || Template.typeFromBracket(e[0] as Bracket);
			if(useLiteralParam){
				params.value[paramName] = paramType.initial;
			}else{
				var literal = new Literal(paramType);
				params.value[paramName] = literal;
			}
			paramTypes.value[paramName] = paramType;
		});
		return {params, paramTypes};
	}
}