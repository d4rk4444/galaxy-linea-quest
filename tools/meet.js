import Web3 from 'web3';
import { info } from './other.js';
import { meet } from './abi.js';

export const dataMeetMint = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(meet, info.meetNFT);

    const data = await contract.methods.mintPublic(
        1
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}

export const dataMeetStake = async(rpc, tokenId, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x0f48a482'
        + '0000000000000000000000000000000000000000000000000000000000000020'
        + '0000000000000000000000000000000000000000000000000000000000000001'
        + (w3.utils.padLeft(w3.utils.numberToHex(tokenId), 64)).slice(2);
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: info.meetStake });
    return { encodeABI, estimateGas };
}

export const dataMeetRedeem = async(rpc, tokenId, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0xf9afb26a'
        + '0000000000000000000000000000000000000000000000000000000000000020'
        + '0000000000000000000000000000000000000000000000000000000000000001'
        + (w3.utils.padLeft(w3.utils.numberToHex(tokenId), 64)).slice(2);
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: info.meetStake });
    return { encodeABI, estimateGas };
}