import Web3 from 'web3';
import { ethers } from 'ethers';
import { info } from './other.js';
import { hopAbi, leyerAbi } from './abi.js';
import { subtract, multiply, divide, add } from 'mathjs';

export const dataBridgeETHtoGoerli = async(rpc, amountETH, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(leyerAbi, info.routerL0Arb);

    const amountOutMin = parseInt(multiply(amountETH, 10));
    const valueTX = add(amountETH, 0.005 * 10**18);

    const data = await contract.methods.swapAndBridge(
        w3.utils.numberToHex(amountETH),
        w3.utils.numberToHex(amountOutMin),
        154,
        addressTo,
        addressTo,
        '0x0000000000000000000000000000000000000000',
        '0x'
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueTX });
    return { encodeABI, estimateGas, valueTX };
}

export const dataBridgeETHtoLinea = async(rpc, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(hopAbi, info.bridgeHop);

    const amountOutMin = subtract(parseInt(multiply(amount, 0.9)), 2 * 10**16);
    const relayerFee = '10000000000000000';
    const valueTX = add(amount, relayerFee);

    const data = await contract.methods.sendToL2(
        59140,
        addressTo,
        w3.utils.numberToHex(amount),
        w3.utils.numberToHex(amountOutMin),
        Date.now() + 5 * 60 * 1000,
        info.relayerHop,
        relayerFee
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueTX });
    return { encodeABI, estimateGas, valueTX };
}

export const dataBridgeTokentoLinea = async(rpc, addressHopRouter, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(hopAbi, addressHopRouter);

    const amountOutMin = parseInt(multiply(amount, 0.99));
    const relayerFee = '0';
    const valueTX = 0.05 * 10**18;

    const data = await contract.methods.sendToL2(
        59140,
        addressTo,
        w3.utils.numberToHex(amount),
        w3.utils.numberToHex(amountOutMin),
        Date.now() + 5 * 60 * 1000,
        info.relayerHopToken,
        relayerFee
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueTX });
    return { encodeABI, estimateGas, valueTX };
}

export const dataBridgeZetaChainBSC = async(rpc, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    
    const encodeABI = '0x71ec5c05'
        + 'aa669c4922569c1d33f7a81aaa218138'
        + '00000000000000000000000013a0c5930c028511dc02665e7285134b6d11a5f4'
        + (w3.utils.padLeft(addressTo, 64)).slice(2)
        + '0000000000000000000000000000000000000000000000000000000000000000';
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, value: amount });

    return { encodeABI, estimateGas };
}

export const dataBridgeZetaChainMATIC = async(rpc, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    
    const encodeABI = '0x71ec5c05'
        + 'aa669c4922569c1d33f7a81aaa218138'
        + '000000000000000000000000d97b1de3619ed2c6beb3860147e30ca8a7dc9891'
        + (w3.utils.padLeft(addressTo, 64)).slice(2)
        + '0000000000000000000000000000000000000000000000000000000000000000';
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, value: amount });

    return { encodeABI, estimateGas };
}