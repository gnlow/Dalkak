import {Namespace} from "./Namespace";

export class Dict<T> {
    namespace: Namespace = new Namespace;
    value: Record<string, T>;
    constructor(value = {}){
        this.value = value;
    }
};