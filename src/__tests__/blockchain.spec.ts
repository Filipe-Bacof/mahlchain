import { Blockchain } from '@src/blockchain';
import { mockBlockData } from '@tests/mocks/block-data-mock';

describe('Blockchain', () => {
    let blockchain: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('should create a blockchain with a genesis block', () => {
        expect(blockchain.blocks.length).toBe(1);
        expect(blockchain.blocks[0].index).toBe(0);
        expect(blockchain.blocks[0].previousHash).toBe('');
        expect(blockchain.blocks[0].data).toEqual({ message: 'Genesis Block' });
    });

    it('should add a new block to the blockchain', () => {
        blockchain.addBlock(mockBlockData);

        expect(blockchain.blocks.length).toBe(2);
        expect(blockchain.blocks[1].index).toBe(1);
        expect(blockchain.blocks[1].previousHash).toBe(blockchain.blocks[0].hash);
        expect(blockchain.blocks[1].data).toEqual(mockBlockData);
    });

    it('should adjust difficulty based on mining performance', () => {
        blockchain.adjustDifficulty(1000001, 1000, 2000);
        expect(blockchain.difficulty).toBe(1);

        blockchain.adjustDifficulty(1000000, 1000, 2000);
        expect(blockchain.difficulty).toBe(1);

        blockchain.adjustDifficulty(1000001, 1000, 2000);
        expect(blockchain.difficulty).toBe(2);

        blockchain.adjustDifficulty(1000, 1000, 2000);
        expect(blockchain.difficulty).toBe(1);

        blockchain.adjustDifficulty(1000, 1000, 2000);
        expect(blockchain.difficulty).toBe(0);
    });

    it('should validate the integrity of the genesis block', () => {
        blockchain.blocks[0].data = { message: 'Invalid data' };
        expect(blockchain.isValid()).toBe(false);
    });

    it('should validate the integrity of the blockchain', () => {
        blockchain.addBlock(mockBlockData);
        expect(blockchain.isValid()).toBe(true);

        blockchain.blocks[1].data = { message: 'Invalid data' };
        expect(blockchain.isValid()).toBe(false);
    });

    it('should return blockchain data with hash and data for each block', () => {
        const expectedBlockchainData = {
            0: {
                hash: blockchain.blocks[0].hash,
                data: blockchain.blocks[0].data
            }
        };

        blockchain.addBlock(mockBlockData);

        expectedBlockchainData[1] = {
            hash: blockchain.blocks[1].hash,
            data: blockchain.blocks[1].data
        };

        expect(blockchain.getBlockchainData()).toEqual(expectedBlockchainData);
    });
});
