import Web3 from 'web3';
import { info } from './other.js';
import { hopAbi } from './abi.js';
import { subtract, multiply, divide, add } from 'mathjs';

export const dataBridgeETHtoLinea = async(rpc, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(hopAbi, info.bridgeHop);

    const amountOutMin = parseInt(subtract(multiply(amount, 0.99), 2 * 10**16));
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

export const dataBridgeTokentoLinea = async(rpc, amount, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(hopAbi, info.bridgeHopDAI);

    const amountOutMin = parseInt(subtract(multiply(amount, 0.99), 2 * 10**16));
    const relayerFee = '0';
    const valueTX = 0.01 * 10**18;

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