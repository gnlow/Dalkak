import { Pack, prop as packProp } from "./Pack"
import type { Project } from "./Project"
import type { Local } from "./Local"
import type { Platform } from "./Platform"

type Callback = (project: Project, local?: Local, platform?: Platform) => any

interface Listener {
    run?: Callback,
    stop?: Callback,
    mount?: Callback,
}

interface prop {
    color?: number,
    on?: Listener,
}

export class Extension extends Pack {
    color: number
    on: Listener
    constructor({
        color = 0,
        on = {},
        ...option
    }: prop & packProp = {}) {
        super(option)
        this.color = color
        this.on = on
    }
}