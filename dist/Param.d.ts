import Block from "./Block";
export default class Param {
    type: string;
    name: string;
    value: boolean | string | Block;
    constructor(type: string, name?: string);
}
