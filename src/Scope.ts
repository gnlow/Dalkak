export class Scope {
    dir: any[]
    constructor(...dir: any[]) {
        this.dir = dir
    }
    copy() {
        return new Scope(...this.dir)
    }
    dive(path: any) {
        let copy = this.copy()
        copy.dir.push(path)
        return copy
    }
    compare(target: Scope) {
        return this.dir.findIndex((value, i) => value !== target.dir[i]) == -1
    }
}