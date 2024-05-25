import * as sha256 from "crypto-js/sha256"
import { BlockData } from "./types/block-data";

export default class Block {
    index: number;
    data: BlockData;
    timestamp = new Date();
    previousHash: string;
    hash = "";
    nonce = 0;

    constructor(index: number, previousHash: string, data: BlockData, difficulty: number) {
        this.index = index;
        this.data = data;
        this.timestamp = new Date();
        this.previousHash = previousHash;

        this.mine(difficulty)
    }

    mine(difficulty: number) {
        const prefix = '0'.repeat(difficulty);

        do {
            this.nonce++;
            this.hash = this.generateHash();
        } while (!this.hash.startsWith(prefix))
    }

    generateHash() {
        const block = {
            index: this.index,
            data: this.data,
            timestamp: this.timestamp,
            previousHash: this.previousHash,
            nonce: this.nonce
        }

        return sha256(JSON.stringify(block)).toString();
    }
}