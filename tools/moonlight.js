import Web3 from 'web3';
import { info } from './other.js';
import { moonlight } from './abi.js';

export const dataMoonMintNFT = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(moonlight, info.moonlight);

    const data = await contract.methods.mint();

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}

export const dataVerifyMoon = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x3c46ce23'
    + (w3.utils.padLeft(addressFrom, 64)).slice(2)
    + '0000000000000000000000000000000000000000000000000000000000000040'
    + '0000000000000000000000000000000000000000000000000000000000000020'
    + 'd08fbf3eb09fbd314e71fc192a0b337b500ee6ad055668351eb3c1ff1676359c';

    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: info.moonlight });
    return { encodeABI, estimateGas };
}