import { Local } from "./Local"
import { Pack } from "./Pack"
import { Template } from "./Template"
import { Type } from "./Type"
import { Dict, Dictable } from "./Dict"
import { Param } from "./Param"
import { Util } from "./Util"
import { Project } from "./Project"
import type { Platform } from "./Platform"

interface prop {
    name?: string, 
    template?: string, 
    func?: (param: any, project: Project, local: Local, platform?: Platform) => any, 
    params?: Dictable<Param>,
    pack?: Pack,
    useLiteralParam?: boolean
}

/**
 * @param name 블록의 이름
 * @param template 블록 내용을 지정하는 템플릿 문자열
 * @param func 실행될 함수
 * @param params 파라미터 기본값
 * @param pack template에서 타입 정보를 참조할 Pack
 */
export class Block{
    name: string
    template: Template
    func?: (param: any, project: Project, local: Local, platform?: Platform) => any
    params: Dict<Param>
    pack?: Pack
    paramTypes: Dict<Type>
    returnType: Type
    useLiteralParam?: boolean
    constructor({
        name = Util.randString(5), 
        template = "( )", 
        func = () => {},
        params = new Dict,
        pack = new Pack,
        useLiteralParam = false
    }: prop = {}) {
        this.pack = pack
        this.useLiteralParam = useLiteralParam
        this.name = name
        this.template = new Template(template, this.pack)
        this.params = this.template.params
        this.paramTypes = this.template.paramTypes
        this.setParams(new Dict(params))
        this.func = func
        this.returnType = this.template.returnType
    }
    /**
	 * 파라미터 값 일괄 변경.
	 * @param params 덮어씌울 파라미터 정보
	 */
    setParams(params: Dict<Param>): this {
        params.forEach((param, name) => {
            this.setParam(name, param)
        })
        return this
    }
    /**
	 * 파라미터 값 변경.
	 * @param name 파라미터 이름
	 * @param value 새 파라미터 값
	 */
    setParam(name: string, value: Param) { 
        this.params.value[name] = value
        return this
    }
    /**
	 * 블록 실행.
	 * @param project 블록이 실행되고 있는 Project
	 */
    async run(project: Project, local: Local = new Local, platform: Platform = {}) {
        var params: Dict<any> = new Dict
        for (var paramKey in this.params.value) {
            if (this.paramTypes.value[paramKey].extend == Block) {
                params.value[paramKey] = this.params.value[paramKey]
            }else {
                const result = await this.params.value[paramKey].run(project, local, platform)
                if (typeof result == "string") {
                    params.value[paramKey] = this.paramTypes.value[paramKey].fromString(result, project, local, platform)
                }else {
                    params.value[paramKey] = result
                }
                
            }
        }
        return this.func && await this.func(params.value, project, local, platform)
    }
    /**
	 * 블록 정보를 텍스트로 변환.
	 */
    export(): string {
        return this.template.export(this.params)
    }
    /**
	 * 블록 복사.
	 * @param block 블록 원본
	 */
    static fromBlock({name, template, params, ...rest}: Block): Block {
        return new Block({
            name: `Copy_${Util.randString(3)} of ${name}`,
            template: template.template,
            params: Object.assign({}, params.value),
            ...rest
        })
    }
    /**
	 * 입력값이 Block인지 확인.
	 * @param value Block인지 확인할 값
	 */
    static isBlock(value: any): boolean {
        return Type.fromConstructor(Block).check(value)
    }
}