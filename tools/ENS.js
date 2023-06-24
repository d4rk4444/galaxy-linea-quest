import Web3 from 'web3';
import { generateRandomAmount, info, parseFile } from './other.js';

export const generateRandomENS = async() => {
    const words = parseFile('./src/words.txt');
    let word = words[generateRandomAmount(0, words.length - 1, 0)];
    const number  = generateRandomAmount(10, 99, 0).toString();
    word = word + number;

    return word;
}

export const dataMintENS = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0xe1ed475e'
        + '0000000000000000000000000000000000000000000000000000000000000040'
        + (w3.utils.padLeft(addressFrom, 64)).slice(2)
        + '0000000000000000000000000000000000000000000000000000000000000014'
        + (w3.utils.stringToHex(await generateRandomENS() + '.linea-build.eth')).slice(2);

    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: info.ENSLinea, value: 0.01 * 10**18 });
    return { encodeABI, estimateGas };
}