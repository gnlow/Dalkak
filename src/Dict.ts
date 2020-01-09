import {Namespace} from "./Namespace";

export interface Dict<T> {
    value:{
        [key: string]: T;
    }, 
    namespace: Namespace
};