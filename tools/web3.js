import Web3 from 'web3';
import { info, privateToAddress } from './other.js';
import { abiToken } from './abi.js';

export const getGasPrice = async(rpcProvider) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpcProvider));
    const gasPrice = await w3.eth.getGasPrice();
    const gasPriceInGwei = w3.utils.fromWei(gasPrice, 'Gwei');

    return gasPriceInGwei;
}

export const getETHAmount = async(rpc, walletAddress) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const data = await w3.eth.getBalance(walletAddress);
    return data;
}

export const getAmountToken = async(rpc, tokenAddress, walletAddress) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const token = new w3.eth.Contract(abiToken, w3.utils.toChecksumAddress(tokenAddress));

    const data = await token.methods.balanceOf(
        walletAddress
    ).call();

    return data;
}

export const checkAllowance = async(rpc, tokenAddress, walletAddress, spender) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const token = new w3.eth.Contract(abiToken, w3.utils.toChecksumAddress(tokenAddress));

    const data = await token.methods.allowance(
        walletAddress,
        spender
    ).call();

    return data;
}

export const dataApprove = async(rpc, tokenAddress, contractAddress, fromAddress) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, w3.utils.toChecksumAddress(tokenAddress));

    const data = await contract.methods.approve(
        contractAddress,
        info.approveAmount,
    );
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: fromAddress });

    return { encodeABI, estimateGas };
}

export const dataSendToken = async (rpc, tokenAddress, toAddress, amount, fromAddress) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, w3.utils.toChecksumAddress(tokenAddress));

    const data = await contract.methods.transfer(
        toAddress,
        w3.utils.numberToHex(amount)
    );
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: fromAddress });

    return { encodeABI, estimateGas };
}

export const sendEVMTX = async(rpc, typeTx, gasLimit, toAddress, value, data, privateKey, maxFeeOrGasPrice, maxPriorityFee) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const fromAddress = privateToAddress(privateKey);
    let tx;
    
    if (typeTx == 0) {
        tx = {
            'from': fromAddress,
            'gas': gasLimit,
            'gasPrice': w3.utils.toWei(maxFeeOrGasPrice, 'Gwei'),
            'chainId': await w3.eth.getChainId(),
            'to': toAddress,
            'nonce': await w3.eth.getTransactionCount(fromAddress),
            'value': value,
            'data': data
        }
    } else if (typeTx == 2) {
        tx = {
            'from': fromAddress,
            'gas': gasLimit,
            'maxFeePerGas': w3.utils.toWei(maxFeeOrGasPrice, 'Gwei'),
            'maxPriorityFeePerGas': w3.utils.toWei(maxPriorityFee, 'Gwei'),
            'chainId': await w3.eth.getChainId(),
            'to': toAddress,
            'nonce': await w3.eth.getTransactionCount(fromAddress),
            'value': value,
            'data': data
        }
    }

    const signedTx = await w3.eth.accounts.signTransaction(tx, privateKey);
    await w3.eth.sendSignedTransaction(signedTx.rawTransaction, async(error, hash) => {
        if (!error) {
            const chain = (Object.keys(info)[Object.values(info).findIndex(e => e == rpc)]).slice(3);
            const explorer = info['explorer' + (Object.keys(info)[Object.values(info).findIndex(e => e == rpc)]).slice(3)];
            console.log(`${chain} TX: ${explorer + hash}`);
        } else {
            console.log(`Error Tx: ${error}`);
        }
    });
}

export const sendGoerliTX = async(rpc, gasLimit, gasPrice, toAddress, value, data, privateKey) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const fromAddress = privateToAddress(privateKey);
    
    const tx = {
        'from': fromAddress,
        'gas': gasLimit,
        'gasPrice': w3.utils.toWei(gasPrice, 'Gwei'),
        'chainId': await w3.eth.getChainId(),
        'to': toAddress,
        'nonce': await w3.eth.getTransactionCount(fromAddress),
        'value': w3.utils.numberToHex(value),
        'data': data
    };

    const signedTx = await w3.eth.accounts.signTransaction(tx, privateKey);
    await w3.eth.sendSignedTransaction(signedTx.rawTransaction, async(error, hash) => {
        if (!error) {
            console.log(`TX: ${info.explorerGoerli + hash}`);
        } else {
            console.log(`Error Tx: ${error}`);
        }
    });
}

export const sendLineaTX = async(rpc, gasLimit, gasPrice, toAddress, value, data, privateKey) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const fromAddress = privateToAddress(privateKey);
    
    const tx = {
        'from': fromAddress,
        'gas': gasLimit,
        'gasPrice': w3.utils.toWei(gasPrice, 'Gwei'),
        'chainId': await w3.eth.getChainId(),
        'to': toAddress,
        'nonce': await w3.eth.getTransactionCount(fromAddress),
        'value': w3.utils.numberToHex(value),
        'data': data
    };

    const signedTx = await w3.eth.accounts.signTransaction(tx, privateKey);
    await w3.eth.sendSignedTransaction(signedTx.rawTransaction, async(error, hash) => {
        if (!error) {
            console.log(`TX: ${info.explorerLinea + hash}`);
        } else {
            console.log(`Error Tx: ${error}`);
        }
    });
}