import { Pack, prop as packProp } from "./Pack";

interface prop {
    color?: number,
    on?: {
        run?(): any,
        stop?(): any,
        mount?(): any,
    },
}

export class Extension extends Pack {
    color: number;
    on: { run?(): any; stop?(): any; mount?(): any; };
    constructor({
        color = 0,
        on = {},
        ...option
    }: prop & packProp = {}){
        super(option);
        this.color = color;
        this.on = on;
    }
}