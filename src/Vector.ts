export class Vector{
	poses: Array<number>;
	dimension: number;
	constructor(...poses: Array<number>){
		this.poses = poses || []; // Array
		this.dimension = this.poses.length; // Number
	}
	rotate(angle = 0): Vector{
		angle = angle * Math.PI / 180;
		return new Vector(
			(this.poses[0] * Math.cos(angle) - this.poses[1] * Math.sin(angle)),
			(this.poses[0] * Math.sin(angle) + this.poses[1] * Math.cos(angle))
		);
	}
	round(digits = 0): Vector{
		return new Vector(...this.poses.map(x => Math.round(x * 10**digits)/10**digits));
	}
}