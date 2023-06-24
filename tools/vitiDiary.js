import Web3 from 'web3';
import { info } from './other.js';
import { vitiDiary, attic } from './abi.js';

export const dataVityDiaryCompleteTutorial = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(vitiDiary, info.vitiDiary);

    const data = await contract.methods.completeTutorial();

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}

export const dataMintVityDiaryNFT = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(attic, info.vitiDiary);

    const data = await contract.methods.mint(
        1
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}