import Web3 from 'web3';
import { info } from './other.js';
import { battlemon } from './abi.js';

export const dataBattlemonPickaxe = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(battlemon, info.battlePockaxe);

    const data = await contract.methods.mint(
        addressFrom
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom, value: 0.01 * 10**18 });
    return { encodeABI, estimateGas };
}

export const dataBattlemonLemon = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(battlemon, info.battleLemon);

    const data = await contract.methods.mint(
        addressFrom,
        4
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}

export const dataBattlemonMerge = async(rpc, tokenId1, tokenId2, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(battlemon, info.battleLemon);

    const data = await contract.methods.merge(
        tokenId1,
        tokenId2
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom, value: 0.0005 * 10**18 });
    return { encodeABI, estimateGas };
}