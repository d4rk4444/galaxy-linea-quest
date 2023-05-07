import Web3 from 'web3';
import axios from 'axios';
import { generateRandomAmount, info } from './other.js';
import { lifiABi } from './abi.js';

export const getQuote = async (fromChain, toChain, fromToken, toToken, fromAmount, fromAddress) => {
    const result = await axios.get('https://staging.li.quest/v1/quote', {
        params: {
            fromChain,
            toChain,
            fromToken,
            toToken,
            fromAmount,
            fromAddress,
            integrator: 'testnet.jumper.exchange'
        }
    });

    return result.data;
}

export const dataBridgeUSDTToLinea = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(lifiABi, info.bridgeLiFi);

    const valueForTx = '20000000000000000';
    const deadline = Date.now() + 24 * 60 * 60 * 1000;
    const txID = w3.utils.padLeft(w3.utils.numberToHex('123623237232732382323783328732834242329232323942394923278278378238232932' + generateRandomAmount(1000, 9000, 0)), 64);

    const data = await contract.methods.startBridgeTokensViaHop(
        [
            txID,
            'hop',
            'testnet.jumper.exchange',
            '0x0000000000000000000000000000000000000000',
            '0xfad6367E97217cC51b4cd838Cc086831f81d38C2',
            addressTo,
            '10000000',
            '59140',
            false,
            false
        ],
        [
            '0',
            '9950000',
            deadline,
            '9950000',
            deadline,
            '0xB47dE784aB8702eC35c5eAb225D6f6cE476DdD28',
            '0',
            '20000000000000000'
        ]
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, data: encodeABI, value: valueForTx });
    return { encodeABI, estimateGas, valueForTx };
}

export const dataBridgeUNIToLinea = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(lifiABi, info.bridgeLiFi);

    const valueForTx = '20000000000000000';
    const deadline = Date.now() + 24 * 60 * 60 * 1000;
    const txID = w3.utils.padLeft(w3.utils.numberToHex('123623237232732382323783328732834242329232323942394923278278378238232932' + generateRandomAmount(1000, 9000, 0)), 64);

    const data = await contract.methods.startBridgeTokensViaHop(
        [
            txID,
            'hop',
            'testnet.jumper.exchange',
            '0x0000000000000000000000000000000000000000',
            '0x41E5E6045f91B61AACC99edca0967D518fB44CFB',
            addressTo,
            '1000000000000000000',
            '59140',
            false,
            false
        ],
        [
            '0',
            '995000000000000000',
            deadline,
            '995000000000000000',
            deadline,
            '0xB47dE784aB8702eC35c5eAb225D6f6cE476DdD28',
            '0',
            '20000000000000000'
        ]
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, data: encodeABI, value: valueForTx });
    return { encodeABI, estimateGas, valueForTx };
}