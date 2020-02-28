import {Block} from "./Block";
import {Project} from "./Project";
import {Dict} from "./Dict";
import {Param} from "./Param";
import {Type} from "./Type";

interface prop {
	blocks?: Array<Block>,
}

export class BlockGroup implements Block {
	name: string;
	params: Dict<Param>;
	paramTypes: Dict<Type>;
	returnType: Type;

	blocks: Array<Block>;
	constructor({
		blocks = [],
	}: prop = {}){
		this.blocks = blocks;
	}
	/**
	 * 파라미터 값 일괄 변경.
	 * @param params 덮어씌울 파라미터 정보
	 */
	setParams(params: Dict<Param>): this{
		params.forEach((param, name) => {
			this.setParam(name, param);
		});
		return this;
	}
	/**
	 * 파라미터 값 변경.
	 * @param name 파라미터 이름
	 * @param value 새 파라미터 값
	 */
	async setParam(name: string, value: Param){ 
		this.params.value[name] = value;
		var result = await value.run();
		if( this.paramTypes.value[name].check( result ) ){
			// OK
		}else{
			throw Error(`'${result}' is not assignable to type '${this.paramTypes.value[name].name}'`);
		}
		return this;
	}
	async run(project: Project = new Project, platform?: object) {
		for(var block of this.blocks){
			await block.run(project, platform);
		}
	}
	attach(blockGroup: BlockGroup): BlockGroup{
		return new BlockGroup({
			blocks: this.blocks.concat(blockGroup.blocks)
		});
	}
	export(): string{
		var exported = "";
		this.blocks.forEach(block => exported += `${block.export()}\n`);
		return exported;
	}
	static fromBlock(block: Block): BlockGroup{
		return new BlockGroup({blocks: [block]});
	}
}