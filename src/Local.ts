import { Dict } from "./Dict";
import { Variable } from "./Variable";

export interface Local {
	variables: Dict<Variable>;
}