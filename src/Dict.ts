import {Namespace} from "./Namespace";

export type Dictable<T> = Record<string, T> | Dict<T>;

export class Dict<T> {
    namespace: Namespace = new Namespace;
    value: Record<string, T>;
    constructor(value: Dictable<T> = {}){
        if(value instanceof Dict){
            this.value = value.value;
        }else{
            this.value = value;
        }
    }
};