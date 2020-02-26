import { Pack, prop as packProp } from "./Pack";

interface prop {
    color?: number,
    event?: {
        run(),
        stop(),
        mount(),
    },
}

export class Extension extends Pack {
    color: number;
    event: { run(): any; stop(): any; mount(): any; };
    constructor({
        color,
        event,
        ...option
    }: prop & packProp = {}){
        super(option);
        this.color = color;
        this.event = event;
    }
}