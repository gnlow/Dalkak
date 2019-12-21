export class Dict<T>{
    values: object;
    constructor(){
        this.values = {};
    }
    set(name: string, value: T): this{
        this.values[name] = value;
        return this;
    }
    get(name: string): T{
        return this.values[name];
    }
}