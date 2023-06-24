import Web3 from 'web3';
import { info } from './other.js';
import { generateRandomENS } from './ENS.js';

export const dataMintL2Domen = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x9c87a121'
        + '0000000000000000000000000000000000000000000000000000000000000040'
        + '0000000000000000000000000000000000000000000000000000000001e13380'
        + '0000000000000000000000000000000000000000000000000000000000000007'
        + (w3.utils.stringToHex(await generateRandomENS())).slice(2);

    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: info.lineal2, value: 0.0025 * 10**18 });
    return { encodeABI, estimateGas };
}