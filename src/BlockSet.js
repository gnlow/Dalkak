export default class BlockSet{
	constructor(name, infos, events){
		this.infos = infos || []; // Array by BlockInfo
		this.events = events || []; // Array by Event
	}
}