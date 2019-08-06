import BlockInfo from "./BlockInfo";

export default class BlockSet{
	name: string;
	infos: Array<BlockInfo>;
	events: Array<Event>;
	constructor(name?: string, infos?: Array<BlockInfo>, events?: Array<Event>){
		this.infos = infos || [];
		this.events = events || [];
	}
}