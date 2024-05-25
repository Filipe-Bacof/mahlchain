import Block from "../block";
import { mockBlockData } from "@tests/mocks/block-data-mock"

describe("class: Block", () => {
    it('should create a block with correct index, data, and previous hash', () => {
        const index = 1;
        const previousHash = '0000abcd';
        const difficulty = 2;

        const block = new Block(index, previousHash, mockBlockData, difficulty);

        expect(block.index).toBe(index);
        expect(block.data).toBe(mockBlockData);
        expect(block.previousHash).toBe(previousHash);
        expect(block.hash).toMatch(/^00/);
    });

    it('should have a valid hash that matches the difficulty', () => {
        const difficulty = 2;
        const block = new Block(1, '0', mockBlockData, difficulty);

        expect(block.hash.startsWith('0'.repeat(difficulty))).toBe(true);
    });

    it('should increment nonce until a valid hash is found', () => {
        const difficulty = 2;
        const block = new Block(1, '0', mockBlockData, difficulty);

        expect(block.nonce).toBeGreaterThan(0);
    });

    it('should generate different hashes for different nonces', () => {
        const block1 = new Block(1, '0', mockBlockData, 1);
        const block2 = new Block(1, '0', mockBlockData, 1);

        block2.nonce = block1.nonce + 1;
        block2.hash = block2.generateHash();

        expect(block1.hash).not.toBe(block2.hash);
    });

    it('should mine a block in a reasonable amount of time for low difficulty', () => {
        const difficulty = 1;
        const start = Date.now();
        new Block(1, '0', mockBlockData, difficulty);
        const end = Date.now();

        expect(end - start).toBeLessThan(1000);
    });
})