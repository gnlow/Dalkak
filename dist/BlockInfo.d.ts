export default class BlockInfo {
    name: string;
    template: string;
    func: Function;
    params: object;
    constructor(name?: string, template?: string, func?: Function, params?: object);
    genParams(rule: RegExp): {};
}
