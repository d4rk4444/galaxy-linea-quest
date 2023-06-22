import Web3 from 'web3';
import { info } from './other.js';
import { ghostAbi } from './abi.js';

export const dataClaimFreeGhost = async(rpc, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, info.ghostFreeNFT);

    const data = await contract.methods.sendMeGhostNft(
        '0xd500efdef75e89bf6caf5c98f7633575d0049a72'
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}

export const dataCollateralGhost = async(rpc, addressColl, nftID, amount, addressToken, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, addressColl);

    const data = await contract.methods.collateralize(
        nftID,
        [w3.utils.numberToHex(amount)],
        [addressToken]
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = addressToken == info.ETHLinea ? await data.estimateGas({ from: addressTo, value: amount }) : await data.estimateGas({ from: addressTo })
    return { encodeABI, estimateGas };
}

export const dataUncollateralGhost = async(rpc, addressColl, nftID, amount, addressToken, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, addressColl);

    const data = await contract.methods.uncollateralize(
        nftID,
        [w3.utils.numberToHex(amount)],
        [addressToken]
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}

export const dataRegisterCollectionGhost = async(rpc, addressCollection, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, info.ghostCollection);

    const amountETH = 5 * 10**16;
    const data = await contract.methods.registerCollection(
        addressCollection,
        info.ETHLinea,
        0,
        0
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo, value: amountETH });
    return { encodeABI, estimateGas, amountETH };
}

export const dataCollateralCollectionGhost = async(rpc, addressColl, nftID, amount, addressToken, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, info.ghostCollection);

    const data = await contract.methods.collateralize(
        addressColl,
        nftID,
        [w3.utils.numberToHex(amount)],
        [addressToken],
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = addressToken == info.ETHLinea ? await data.estimateGas({ from: addressTo, value: amount }) : await data.estimateGas({ from: addressTo })
    return { encodeABI, estimateGas };
}

export const dataUncollateralCollectionGhost = async(rpc, addressColl, nftID, amount, addressToken, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(ghostAbi, info.ghostCollection);

    const data = await contract.methods.uncollateralize(
        addressColl,
        nftID,
        [w3.utils.numberToHex(amount)],
        [addressToken]
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}