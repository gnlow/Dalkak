export class Scope {
    dir: any[];
    constructor(...dir: any[]){
        this.dir = dir
    }
    dive(path: any){
        let copy = new Scope(...this.dir);
        copy.dir.push(path);
        return copy;
    }
    compare(target: Scope){
        return this.dir.findIndex((value, i) => value !== target.dir[i]) == -1;
    }
}