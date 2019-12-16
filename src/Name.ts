export class Name{
	name: string;
	constructor(name = Name.randomize()){
		this.name = name;
	}
	static randomize(): string{
		var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var result = "";
		for(var i=0;i<5;i++){
			result += charSet.charAt(Math.floor(Math.random() * charSet.length));
		}
		return result;
	}
}