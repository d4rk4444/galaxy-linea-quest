import Web3 from 'web3';
import { info } from './other.js';
import { bilinearAbi } from './abi.js';

export const dataMintBilinearGameNFT = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(bilinearAbi, info.zeroMission);

    const data = await contract.methods.mint();
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}

export const dataMintCollectionBilinear = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x9d91c929'
    + '00000000000000000000000000000000000000000000000000000000000000e0'
    + '0000000000000000000000000000000000000000000000000000000000000120'
    + '0000000000000000000000000000000000000000000000000000000000000160'
    + '0000000000000000000000000000000000000000000000000000000000000064'
    + '0000000000000000000000000000000000000000000000000000000000000000'
    + 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    + (w3.utils.padLeft(addressTo, 64)).slice(2)
    + '0000000000000000000000000000000000000000000000000000000000000004'
    + '4e616d6500000000000000000000000000000000000000000000000000000000'
    + '0000000000000000000000000000000000000000000000000000000000000006'
    + '53796d626f6c0000000000000000000000000000000000000000000000000000'
    + '0000000000000000000000000000000000000000000000000000000000000035'
    + '697066733a2f2f516d59484e656b7344756170526d6146445058374856456576'
    + '4665426d447442524c787a416842556b4836726a6d0000000000000000000000';

    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressTo, to: info.bilinear });
    return { encodeABI, estimateGas };
}

export const dataMintSellNFTBilinear = async(rpc, addressCollection, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x97776f40000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000035697066733a2f2f516d64393862355737553552775256476d517344505156376472584a32673458787a777748336a674d70347438370000000000000000000000';

    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressTo, to: addressCollection });
    return { encodeABI, estimateGas };
}

export const dataBuyNftBilinear = async(rpc, addressToken, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(bilinearAbi, addressToken);

    const amountETH = 1 * 10**16;
    const data = await contract.methods.buy(
        addressTo,
        '0',
        '1'
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: amountETH });
    return { encodeABI, estimateGas, amountETH };
}