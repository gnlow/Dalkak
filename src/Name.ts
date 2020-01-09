import {Util} from "./Util";
import {Namespace} from "./Namespace";

export class Name{
	namespace: Namespace;
	key: string;
	constructor(namespace: Namespace, key = Util.randString(5)){
		this.namespace = namespace;
		this.key = this.namespace.names.has(key) ? Util.randString(5) : key;
		this.namespace.names.add(this.key);
	}
}