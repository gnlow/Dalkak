export default class Vector {
    poses: Array<number>;
    dimension: number;
    constructor(...poses: Array<number>);
    rotate(angle?: number): Vector;
    round(digits?: number): Vector;
}
