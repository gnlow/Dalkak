type Checker = (value: any) => boolean;

export class Type{
    checker: Checker
    constructor(
        checker: Checker = () => false
    ){
        this.checker = checker;
    }
    check(value: any): boolean{
        return this.checker(value);
    }
    static typeof(typeName: string): Type{
        return new Type(value => typeof value == typeName);
    }
}