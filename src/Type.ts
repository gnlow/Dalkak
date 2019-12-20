import {Name} from "./Name";

type Checker = (value: any) => boolean;

export class Type{
    checker: Checker
    constructor(
        name = Name.randomize(), 
        checker: Checker = () => false
    ){
        this.checker = checker;
    }
    check(value: any): boolean{
        return this.checker(value);
    }
    static typeof(typeName: string): Type{
        return new Type(typeName, value => typeof value == typeName);
    }
}