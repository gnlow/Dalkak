import { Pack, prop as packProp } from "./Pack";
import type { Project } from "./Project";

interface Listener {
    run?(project: Project): any,
    stop?(project: Project): any,
    mount?(project: Project): any,
};

interface prop {
    color?: number,
    on?: Listener,
};

export class Extension extends Pack {
    color: number;
    on: Listener;
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