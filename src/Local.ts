import { Dict } from "./Dict";
import { Variable } from "./Variable";
import { Scope } from "./Scope";

export class Local {
	scope: Scope;
	variables: Dict<Variable[]>;
	constructor(variables?: Dict<Variable>){
		this.variables = new Dict;
		variables?.forEach(variable => this.variables.value[variable.name] = [variable]);
		this.scope = new Scope;
	}
	copy(){
		return Object.assign(new Local, this);
	}
	dive(path: any){
		let copy = this.copy();
		copy.scope = copy.scope.dive(path);
		return copy;
	}
	getVariable(name: string){
		if(!this.variables.value[name]){
			this.variables.value[name] = [];
		}
		return this.variables.value[name].find(variable => variable.scope.compare(this.scope)) 
		|| this.variables.value[name][this.variables.value[name].push(new Variable({name})) - 1];
	}
}