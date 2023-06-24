import Web3 from 'web3';
import { info, parseFile } from './other.js';
import { readon } from './abi.js';
import { generateRandomENS } from './ENS.js';

export const dataReadonMint = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(readon, info.readon);

    const domen = await generateRandomENS();
    const data = await contract.methods.mintTo(
        addressFrom,
        w3.utils.stringToHex(domen)
    );
    console.log(domen);

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}