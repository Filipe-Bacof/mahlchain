import { BlockData } from "@srcTypes/block-data";
import Block from "./block";

export class Blockchain {
    blocks: Block[];
    nextIndex = 1;
    difficulty = 0;
    startTime = new Date();
    endTime: Date;

    constructor() {
        this.blocks = [this.createGenesisBlock()];
    }

    private createGenesisBlock() {
        const genesisBlock = { message: "Genesis Block" } as BlockData;
        return new Block(0, "", genesisBlock, 0);
    }

    getLastHash() {
        return this.blocks[this.blocks.length - 1].hash;
    }

    addBlock(blockData: BlockData) {
        const miningStartTime = new Date().getTime();
        const block = new Block(this.nextIndex, this.getLastHash(), blockData, this.difficulty);
        const miningEndTime = new Date().getTime();
        this.blocks.push(block);
        this.nextIndex++;

        this.adjustDifficulty(block.nonce, miningStartTime, miningEndTime);
    }

    adjustDifficulty(nonce: number, miningStartTime: number, miningEndTime: number) {
        const hashesByMs = nonce / (miningEndTime - miningStartTime);
        //console.log(hashesByMs);

        if (hashesByMs > 1000) {
            this.difficulty++;
        } else if (hashesByMs < 500 && this.difficulty > 0) {
            this.difficulty--;
        }
    }

    isValid() {
        if (this.blocks[0].index !== 0 ||
            this.blocks[0].previousHash !== '' ||
            this.blocks[0].generateHash() !== this.blocks[0].hash) {
            return false;
        }

        for (let i = this.blocks.length - 1; i > 0; i--) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];

            if (currentBlock.hash !== currentBlock.generateHash() ||
                currentBlock.previousHash !== previousBlock.hash ||
                currentBlock.index !== previousBlock.index + 1 ||
                currentBlock.timestamp < previousBlock.timestamp) {
                return false;
            }
        }
        return true;
    }

    getBlockchainData() {
        return this.blocks.reduce((acc, block) => {
            acc[block.index] = {
                hash: block.hash,
                data: block.data
            };
            return acc;
        }, {});
    }
}