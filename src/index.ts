import { Blockchain } from "./blockchain";

const mahlchain = new Blockchain();

for (let i = 0; i < 10; i++) {
    const block = { message: `block ${i}` }
    mahlchain.addBlock(block)
}

// const fakeGenesisBlock = new Block(0, '', { message: "Genesis Block" }, 0)
// mahlchain.blocks[0] = fakeGenesisBlock;
// console.log('fakeGenesis: ', mahlchain.isValid())

// mahlchain.blocks[1].data = { message: "Block940426" }
// console.log('fakeDataBlock1: ', mahlchain.isValid())

// mahlchain.blocks[mahlchain.blocks.length - 1].index = 940426
// console.log('fakeIndex: ', mahlchain.isValid())

console.log(mahlchain.getBlockchainData())