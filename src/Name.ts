import {Namespace} from "./Namespace";

export class Name{
	namespace: Namespace;
	key: string;
	constructor(namespace: Namespace, key = Name.randomize()){
		this.namespace = namespace;
		this.key = this.namespace.names.has(key) ? key : Name.randomize();
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