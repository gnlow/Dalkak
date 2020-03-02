import {Util} from "./Util";

interface prop<T> {
    name?: string,
    checker?: Checker,
    initial?: T,
    extend?: T,
}

interface Constructor {
    new (...any: any[]): any
}

type Checker = (value: any) => boolean;

export class Type<T = any>{
    name: string;
    checker: Checker;
    initial?: T;
    extend?: T;
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
                if(typeof this.extend != "object"){
                    if(typeof value == typeof this.extend){
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
        var defaultValue:{
            [key: string]: boolean | undefined | number | string | symbol
        } = {
            "boolean": false,
            // "null": null,
            "undefined": undefined,
            "number": 0,
            // "bigint": 0n,
            "string": "",
            "symbol": Symbol()
        };
        let value = defaultValue[typeName];
        return new Type<typeof value>({
            name: typeName, 
            extend: value, 
            initial: value,
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