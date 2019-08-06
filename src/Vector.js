export default class Vector{
	constructor(...poses){
		this.poses = poses || []; // Array
		this.dimension = this.poses.length; // Number
		[this.x, this.y, this.z, this.w] = this.poses; // Number
	}
	rotate(angle = 0){
		angle = angle * Math.PI / 180;
		return new Vector(
			(this.x * Math.cos(angle) - this.y * Math.sin(angle)),
			(this.x * Math.sin(angle) + this.y * Math.cos(angle))
		);
	}
	round(digits = 0){
		return new Vector(...this.poses.map(x => Math.round(x * 10**digits)/10**digits));
	}
}