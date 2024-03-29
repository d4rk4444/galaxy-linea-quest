import Web3 from 'web3';
import { info } from './other.js';
import { abiToken, celerAbi } from './abi.js';

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

export const dataMintUSDT = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, info.USDTGoerli);

    const valueMint = 0.05 * 10**18;
    const amountMint = w3.utils.numberToHex((100 * 10**6).toString());
    const data = await contract.methods.mint(
        addressTo,
        amountMint
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueMint });
    return { encodeABI, estimateGas, valueMint };
}

export const dataMintUNI = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, info.UNIGoerli);

    const valueMint = w3.utils.toWei('0.026449999999887587', 'ether');
    const amountMint = w3.utils.numberToHex(w3.utils.toWei('10', 'ether'));
    const data = await contract.methods.mint(
        addressTo,
        amountMint
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueMint });
    return { encodeABI, estimateGas, valueMint };
}

export const dataMintBUSD = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(celerAbi, info.BUSDFaucet);

    const data = await contract.methods.drip(
        [info.BUSDCeler]
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}