// import {ITask} from "../../webapp/Task";
import { Lang, TaskType } from "../../webapp/Enums.js";
import { AbstractTask } from "../../webapp/AbstractTask.js";
class Block {
    constructor(name, timeStamp, amount, previousBlock = undefined) {
        this.name = name;
        this.timeStamp = timeStamp;
        this.transactionAmount = amount;
        this.previousBlock = previousBlock;
    }
}
class BlockChain {
    constructor() {
        this.previousBlock = undefined;
    }
    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new BlockChain();
        }
        return this.instance;
    }
    addBlock(newBlock) {
        this.currentBlock = newBlock;
        this.previousBlock = newBlock.previousBlock != undefined ? newBlock.previousBlock : undefined;
    }
    printBlock() {
        console.log(this.currentBlock);
    }
    getPreviousBlock() {
        return this.previousBlock;
    }
}
export class TestBlockChain extends AbstractTask {
    constructor() {
        super(...arguments);
        this.description = "";
        this.language = Lang.TS;
        this.title = "";
        this.type = TaskType.BLOCKCHAIN;
    }
    static autoTesting(transactionQuantity) {
        let blockChain = BlockChain.getInstance();
        let prevBlock = undefined;
        for (let i = 0; i < transactionQuantity; i++) {
            // @ts-ignore
            let newBlock = new Block(`Block #${i + 1}`, new Date(), i / Math.random(), blockChain.getPreviousBlock());
            blockChain.addBlock(newBlock);
            // prevBlock = newBlock
            blockChain.printBlock();
        }
    }
    static manualTesting() {
        // @ts-ignore
        let bl0 = new Block("Block 1", new Date(), 10);
        // @ts-ignore
        let bl1 = new Block("Block 2", new Date(), 20, bl0);
        // @ts-ignore
        let bl2 = new Block("Block 3", new Date(), 30, bl1);
        // @ts-ignore
        let bl3 = new Block("Block 4", new Date(), 40, bl2);
        // @ts-ignore
        let bl4 = new Block("Block 5", new Date(), 50, bl3);
        console.log(bl0, bl1, bl2, bl3, bl4);
    }
    renderContainer() {
        console.log('Test blockchain...');
        TestBlockChain.autoTesting(5);
        TestBlockChain.manualTesting();
    }
    ;
}
