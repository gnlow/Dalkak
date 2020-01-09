import {Name} from "./Name";
import {Dict} from "./Dict";
import {Util} from "./Util";

interface Constructor {
    new (...any): any
}

type Checker = (value: any) => boolean;

export class Type{
    name: Name;
    checker: Checker;
    initial: any;
    constructor(
        parent = new Dict, 
        name = Util.randString(5), 
        checker: Checker = () => false,
        initial = undefined
    ){
        this.name = new Name(parent.namespace, name);
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
        return new Type(new Dict, typeName, value => typeof value == typeName, defaultValue);
    }
    static fromConstructor(constructor: Constructor): Type{
        return new Type(
            new Dict, 
            constructor.name, 
            value => 
            (value.constructor.name == constructor.name) // Same class
            || 
            (value.constructor.prototype instanceof constructor), // Extended class
            new constructor
        );
    }
}