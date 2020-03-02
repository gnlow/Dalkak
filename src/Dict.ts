export type Dictable<T> = Record<string, T> | Dict<T>;

export class Dict<T> {
    value: Record<string, T>;
    constructor(value: Dictable<T> = {}){
        if(value instanceof Dict){
            this.value = value.value;
        }else{
            this.value = value;
        }
    }
    forEach(callbackfn: (value: T, index: string, dict: Record<string, T>) => void){
        for(var key in this.value){
            callbackfn(this.value[key], key, this.value);
        }
    }
    static mix<T>(...dicts: Dict<T>[]){
        var mixed = new Dict<T>();
        dicts.forEach(dict => {
            Object.assign(mixed.value, dict.value);
        });
        return mixed;
    }
    *[Symbol.iterator](){
        for(let value in this.value){
            yield this.value[value];
        }
    }
};