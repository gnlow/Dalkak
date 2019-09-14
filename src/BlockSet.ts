import Block from "./Block";

export default class BlockSet{
	name: string;
	infos: Array<Block>;
	events: Array<Event>;
	constructor(name?: string, infos?: Array<Block>, events?: Array<Event>){
		this.infos = infos || [];
		this.events = events || [];
	}
}