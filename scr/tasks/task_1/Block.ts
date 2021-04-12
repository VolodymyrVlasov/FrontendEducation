// class Block {
//     name: String
//     transactionAmount: Number
//     previousBlock: Block
//     timeStamp: Date
//
//     constructor(name: String, timeStamp: Date, amount: Number, previousBlock: Block = undefined) {
//         this.name = name
//         this.timeStamp = timeStamp
//         this.transactionAmount = amount
//         this.previousBlock = previousBlock
//     }
// }
//
// class BlockChain {
//     private previousBlock: Block
//     private currentBlock: Block
//
//     addBlock(newBlock: Block) {
//         this.currentBlock = newBlock
//         this.previousBlock = newBlock.previousBlock != undefined ? newBlock.previousBlock : undefined;
//     }
//
//     printBlock() {
//         console.log(this.currentBlock)
//     }
// }
//
// class TestBlockChain {
//
//     static autoTesting(transactionQuantity: Number) {
//         let blockChain: BlockChain = new BlockChain()
//         let prevBlock: Block = undefined
//
//         for (let i = 0; i < transactionQuantity; i++) {
//             // @ts-ignore
//             let newBlock = new Block(`Block #${i + 1}`, new Date(), i / Math.random(), prevBlock)
//             blockChain.addBlock(newBlock)
//             prevBlock = newBlock
//             blockChain.printBlock()
//         }
//     }
//
//     static manualTesting() {
//         let bl0 = new Block("Block 1", new Date(), 10)
//         let bl1 = new Block("Block 2", new Date(), 20, bl0)
//         let bl2 = new Block("Block 3", new Date(), 30, bl1)
//         let bl3 = new Block("Block 4", new Date(), 40, bl2)
//         let bl4 = new Block("Block 5", new Date(), 50, bl3)
//
//         console.log(bl0, bl1, bl2, bl3, bl4)
//
//     }
// }
// //
// // TestBlockChain.autoTesting(5)
// // TestBlockChain.manualTesting()
//
//
//
