import ethers from 'ethers';
import * as WalletUtils from '../wallet';

describe('Wallet utils', () => {

    it('`generateMnemonics` function should return an array of 12 mnemonics', () => {
        const result = WalletUtils.generateMnemonics();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toEqual(12);
        result.forEach(mnemonic => expect(typeof mnemonic).toEqual("string"));
    });
    
    it('`loadWalletFromMnemonics` function should return an `ethers.Wallet` instance when the input is a valid array list of mnemonics', () => {
        const input = ['close', 'spatial', 'armor', 'subway', 'hero', 'wing', 'million', 'arch', 'above', 'vendor', 'address', 'dad'];
        const result = WalletUtils.loadWalletFromMnemonics(input);
        expect(result).toBeInstanceOf(ethers.Wallet);
    });
    
    it('`loadWalletFromMnemonics` function should return an `ethers.Wallet` instance when the input is a valid string list of mnemonics', () => {
        const input = 'close spatial armor subway hero wing million arch above vendor address dad';
        const result = WalletUtils.loadWalletFromMnemonics(input);
        expect(result).toBeInstanceOf(ethers.Wallet);
    });
    
    it('`loadWalletFromMnemonics` function should throw an Error when the input has less than 12 mnemonics', () => {
        const input = 'close spatial armor subway hero wing million arch above vendor address';
        try { WalletUtils.loadWalletFromMnemonics(input); }
        catch(e) { expect(e.message).toEqual('invalid mnemonic')};
    });
    
    it('`loadWalletFromMnemonics` function should throw Error when the input is not string not Array', () => {
        try { WalletUtils.loadWalletFromMnemonics(0); }
        catch(e) { expect(e.message).toEqual('invalid mnemonic')};

        try { WalletUtils.loadWalletFromMnemonics(true); }
        catch(e) { expect(e.message).toEqual('invalid mnemonic')};

        try { WalletUtils.loadWalletFromMnemonics(false); }
        catch(e) { expect(e.message).toEqual('invalid mnemonic')};
        
        try { WalletUtils.loadWalletFromMnemonics({}); }
        catch(e) { expect(e.message).toEqual('invalid mnemonic')};
    });
    
    it('`loadWalletFromPrivateKey` function should return an `ethers.Wallet` instance when the input is a valid private key string', () => {
        const input = '62384683889eae6de8440eb735856f31bb4f17815888f847c8567b3c87f00be8';
        const result = WalletUtils.loadWalletFromPrivateKey(input);
        expect(result).toBeInstanceOf(ethers.Wallet);
    });
    
    it('`loadWalletFromPrivateKey` function should throw Error when the input is not a valid Private key', () => {
        try { WalletUtils.loadWalletFromPrivateKey("zn37m8937nb3078038761b026"); }
        catch(e) { expect(e.message).toEqual('invalid private key')};

        try { WalletUtils.loadWalletFromPrivateKey(""); }
        catch(e) { expect(e.message).toEqual('invalid private key')};
        
        try { WalletUtils.loadWalletFromPrivateKey(0); }
        catch(e) { expect(e.message).toEqual('invalid private key')};

        try { WalletUtils.loadWalletFromPrivateKey(true); }
        catch(e) { expect(e.message).toEqual('invalid private key')};

        try { WalletUtils.loadWalletFromPrivateKey(false); }
        catch(e) { expect(e.message).toEqual('invalid private key')};
        
        try { WalletUtils.loadWalletFromPrivateKey({}); }
        catch(e) { expect(e.message).toEqual('invalid private key')};
    });
});