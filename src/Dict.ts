import {Namespace} from "./Namespace";

export class Dict<T> {
    namespace: Namespace = new Namespace;
    value: {
        [key: string]: T;
    };
    constructor(value = {}){
        this.value = value;
    }
};