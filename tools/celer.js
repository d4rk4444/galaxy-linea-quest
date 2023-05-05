import Web3 from 'web3';
import { info } from './other.js';
import { celerAbi } from './abi.js';

export const dataBridgeBNBToLinea = async(rpc, amountETH, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(celerAbi, info.bridgeCeler);

    const data = await contract.methods.depositNative(
        w3.utils.numberToHex(amountETH),
        59140,
        addressTo,
        Date.now() + 1 * 60 * 1000,
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: amountETH });
    return { encodeABI, estimateGas };
}

export const dataBridgeBUSDToLinea = async(rpc, amountBUSD, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(celerAbi, info.bridgeCeler);

    const data = await contract.methods.deposit(
        info.BUSDCeler,
        w3.utils.numberToHex(amountBUSD),
        59140,
        addressTo,
        Date.now() + 1 * 60 * 1000,
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}