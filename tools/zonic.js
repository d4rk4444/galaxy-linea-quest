import Web3 from 'web3';
import { info } from './other.js';
import { abiToken } from './abi.js';

export const dataSafeTransferZonic = async(rpc, addressCollection, tokenIndex, addressTo) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(abiToken, addressCollection);

    const data = await contract.methods.safeTransferFrom(
        addressTo,
        addressTo,
        tokenIndex
    );
    
    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressTo });
    return { encodeABI, estimateGas };
}