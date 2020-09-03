export class Vector{
    poses: Array<number>
    dimension: number
    get x() {return this.poses[0]}
    set x(s) {this.poses[0] = s}
    get y() {return this.poses[1]}
    set y(s) {this.poses[1] = s}
    get z() {return this.poses[2]}
    set z(s) {this.poses[2] = s}
    constructor(...poses: Array<number>) {
        this.poses = poses
        this.dimension = this.poses.length
    }
    rotate(angle = 0): Vector {
        angle = angle * Math.PI / 180
        return new Vector(
            (this.poses[0] * Math.cos(angle) - this.poses[1] * Math.sin(angle)),
            (this.poses[0] * Math.sin(angle) + this.poses[1] * Math.cos(angle))
        )
    }
    round(digits = 0): Vector {
        return new Vector(...this.poses.map(x => Math.round(x * 10 ** digits) / 10 ** digits))
    }
}