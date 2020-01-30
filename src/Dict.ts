export type Dictable<T> = Record<string, T> | Dict<T>;

export class Dict<T> {
    namespace: Set<string> = new Set;
    value: Record<string, T>;
    constructor(value: Dictable<T> = {}){
        let target: Record<string, T>;
        if(value instanceof Dict){
            target = value.value;
        }else{
            target = value;
        }
        this.value = new Proxy({}, {
            set: (obj, prop, value) => {
                this.namespace.add(value.name);
                obj[prop as string] = value;
                return true;
            }
        });
        for(var item in target){
            this.value[item] = target[item];
        }
    }
};