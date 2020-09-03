import { Util } from "./Util"
import { Type } from "./Type"
import { Scope } from "./Scope"

interface prop {
    name?: string,
    type?: Type,
    value?: any,
    scope?: Scope,
}

export class Variable {
    name: string
    type: Type
    private _value: any
    scope: Scope
    set value(input) {
        if (this.type.check(input)) {
            this._value = input
        }else {
            throw Error(`'${input}' is not assignable to type '${this.type.name}'`)
        }
    }
    get value() {
        return this._value
    }
    constructor({
        name = Util.randString(5),
        type = new Type,
        value = type.initial,
        scope = new Scope,
    }: prop = {}) {
        this.name = name
        this.type = type
        this.value = value
        this.scope = scope
    }
}