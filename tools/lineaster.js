import Web3 from 'web3';
import { generateRandomAmount, info } from './other.js';
import { lineaster } from './abi.js';
import { generateRandomENS } from './ENS.js';


export const dataCreateProfile = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(lineaster, info.lineaster);

    const data = await contract.methods.proxyCreateProfile(
        [addressFrom,
        await generateRandomENS(),
        `https://cdn.stamp.fyi/avatar/eth:${addressFrom}?s=300`,
        '0x0000000000000000000000000000000000000000',
        '0x',
        '']
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}