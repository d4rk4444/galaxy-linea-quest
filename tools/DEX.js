import Web3 from 'web3';
import { info } from './other.js';
import { uniAbi } from './abi.js';

export const dataSwapETHToUSDC = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(uniAbi, info.routerUniswap);

    const valueTX = 0.0001 * 10**18;
    const data = await contract.methods.execute(
        "0x0b00",
        [
            "0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000005af3107a4000",
            "0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000011f84bc00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bb4fbf271143f4fbf7b91a5ded31805e42b2208d6000bb807865c6e87b9f70255377e024ace6630c1eaa37f000000000000000000000000000000000000000000"
        ],
        Date.now() + 5 * 60 * 1000,
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueTX });
    return { encodeABI, estimateGas, valueTX };
}

export const dataSwapBNBToBUSD = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(uniAbi, info.routerUniswapBSC);

    const valueTX = 0.001 * 10**18;
    const data = await contract.methods.multicall(
        Date.now() + 5 * 60 * 1000,
        [
            '0x472b43f300000000000000000000000000000000000000000000000000038d7ea4c68000000000000000000000000000000000000000000000000000b32fa3e4d82d8a0f000000000000000000000000000000000000000000000000000000000000008000000000000000000000000060365500fc2b09d8ab6aff7dd444d0da0fe8059c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000ae13d989dac2f0debff460ac112a837c89baa7cd000000000000000000000000ab1a4d4f1d656d2450692d237fdd6c7f9146e814'
        ]
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: valueTX });
    return { encodeABI, estimateGas, valueTX };
}