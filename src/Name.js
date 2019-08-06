export default class Name{
	constructor(name){
		this.name = name || this.randomize();
	}
	static randomize(){
		var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var result = "";
		for(var i=0;i<5;i++){
			result += charSet.charAt(Math.floor(Math.random() * charSet.length));
		}
		return result;
	}
}