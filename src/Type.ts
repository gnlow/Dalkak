import {Name} from "./Name";

interface Constructor {
    new (...any): any
}

type Checker = (value: any) => boolean;

export class Type{
    name: string;
    checker: Checker;
    initial: any;
    constructor(
        name = Name.randomize(), 
        checker: Checker = () => false,
        initial = undefined
    ){
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
        return new Type(typeName, value => typeof value == typeName, defaultValue);
    }
    static fromConstructor(constructor: Constructor): Type{
        return new Type(constructor.name, value => value.constructor.name == constructor.name, new constructor);
    }
}