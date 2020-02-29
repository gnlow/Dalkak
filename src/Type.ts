import {Util} from "./Util";

interface prop<T> {
    name?: string,
    checker?: Checker,
    initial?: T,
    extend?: T,
}

interface Constructor {
    new (...any): any
}

type Checker = (value: any) => boolean;

export class Type<T = any>{
    name: string;
    checker: Checker;
    initial: T;
    extend: T;
    constructor({
        name = Util.randString(5), 
        checker = () => true,
        initial = undefined,
        extend = undefined,
    }: prop<T> = {}){
        this.name = name;
        this.checker = checker;
        this.initial = initial;
        this.extend = extend;
    }
    check(value: any): boolean{
        if(this.checker(value)){
            if(this.extend){
                if(typeof this.extend == "string"){
                    if(typeof value == this.extend){
                        return true;
                    }
                }else if(isConstructor(this.extend)){
                    if(value instanceof (this.extend as any)){
                        return true;
                    }
                }else if(value === this.extend){
                    return true;
                }
            }else{
                return true;
            }
        }
        return false;
    }
    static typeof(typeName: string): Type<any>{
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
            extend: typeName, 
            initial: defaultValue
        });
    }
    static fromConstructor<T extends Constructor>(constructor: T): Type<T>{
        return new Type({
            name: constructor.name, 
            extend: constructor,
            initial: new constructor
        });
    }
}

function isConstructor(f: any) {
    try{
        new f();
    }catch{
        return false;
    }
    return true;
}