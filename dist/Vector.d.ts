export default class Vector {
    poses: Array<number>;
    dimension: number;
    constructor(...poses: Array<number>);
    rotate(angle?: number): void;
    round(digits?: number): Vector;
}
