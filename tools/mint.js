import Web3 from 'web3';
import { info } from './other.js';
import { abiToken } from './abi.js';

export const dataMintHOP = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, info.HOPGoerli);

    const valueMint = 0.1 * 10**18;
    const amountMint = w3.utils.numberToHex(w3.utils.toWei('1000', 'ether'));
    const data = await contract.methods.mint(
        addressTo,
        amountMint
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueMint });
    return { encodeABI, estimateGas, valueMint };
}

export const dataMintDAI = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, info.DAIGoerli);

    const valueMint = 0.05 * 10**18;
    const amountMint = w3.utils.numberToHex(w3.utils.toWei('100', 'ether'));
    const data = await contract.methods.mint(
        addressTo,
        amountMint
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueMint });
    return { encodeABI, estimateGas, valueMint };
}