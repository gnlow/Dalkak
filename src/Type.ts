import {Name} from "./Name";

type Checker = (value: any) => boolean;

export class Type{
    name: string;
    checker: Checker;
    constructor(
        name = Name.randomize(), 
        checker: Checker = () => false
    ){
        this.name = name;
        this.checker = checker;
    }
    check(value: any): boolean{
        return this.checker(value);
    }
    static typeof(typeName: string): Type{
        return new Type(typeName, value => typeof value == typeName);
    }
    static fromConstructor(constructor: Function): Type{
        return new Type(constructor.name, value => value.constructor.name == constructor.name);
    }
}