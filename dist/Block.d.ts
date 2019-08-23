export default class Block {
    name: string;
    template: string;
    func: Function;
    params: object;
    constructor(name?: string, template?: string, func?: Function, params?: object);
    setParams(params: object): this;
    run(e?: any): void;
    genParams(): object;
    static fromBlock(block: Block): Block;
}
