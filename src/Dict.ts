export type Dictable<T> = Record<string, T> | Dict<T>;

export class Dict<T> {
    value: Record<string, T>;
    constructor(value: Dictable<T> = {}){
        let target: Record<string, T>;
        if(value instanceof Dict){
            this.value = value.value;
        }else{
            this.value = value;
        }
        for(var item in target){
            this.value[item] = target[item];
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
};