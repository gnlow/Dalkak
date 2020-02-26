import { Pack, prop as packProp } from "./Pack";

interface prop {
    color?: number,
    on?: {
        run?(),
        stop?(),
        mount?(),
    },
}

export class Extension extends Pack {
    color: number;
    on: { run?(): any; stop?(): any; mount?(): any; };
    constructor({
        color,
        on,
        ...option
    }: prop & packProp = {}){
        super(option);
        this.color = color;
        this.on = on;
    }
}