import {Util} from "./Util";

interface prop {
    name?: string,
    checker?: Checker,
    initial?: any
}

interface Constructor {
    new (...any): any
}

type Checker = (value: any) => boolean;

export class Type{
    name: string;
    checker: Checker;
    initial: any;
    constructor({
        name = Util.randString(5), 
        checker = () => false,
        initial = undefined
    }: prop = {}){
        this.name = name;
        this.checker = checker;
        this.initial = initial;
    }
    check(value: any): boolean{
        return this.checker(value);
    }
    static typeof(typeName: string): Type{
        var defaultValue = {
            "boolean": false,
            // "null": null,
            "undefined": undefined,
            "number": 0,
            // "bigint": 0n,
            "string": "",
            "symbol": Symbol()
        }[typeName];
        return new Type({
            name: typeName, 
            checker: value => typeof value == typeName, 
            initial: defaultValue
        });
    }
    static fromConstructor(constructor: Constructor): Type{
        return new Type({
            name: constructor.name, 
            checker: value => value instanceof constructor,
            initial: new constructor
        });
    }
}