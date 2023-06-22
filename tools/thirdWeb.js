import Web3 from 'web3';
import axios from 'axios';
import qs from 'qs';
import { generateRandomAmount, info } from './other.js';
import { thirdWeb } from './abi.js';

export const getCollectionAddress = async(rpc, hashCreate) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const transaction = await w3.eth.getTransactionReceipt(hashCreate);
    return transaction.logs[1].address;
}

export const dataGetId = async(rpc) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(thirdWeb, '0xCD4df914c5D857c9e4f050DeE5753E1B6D5Bb262');

    const data = await contract.methods.getActiveClaimConditionId().call();
    
    return data;
}

export const dataCreateTokenDrop = async(rpc, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const contract = new w3.eth.Contract(thirdWeb, info.thirdWebTokenDrop);

    const number = w3.utils.stringToHex(generateRandomAmount(1000000, 2000000, 0).toString());
    const data = await contract.methods.deployProxyByImplementation(
        '0xCD4df914c5D857c9e4f050DeE5753E1B6D5Bb262',
        '0x49c5c5b6'
        + (w3.utils.padLeft(addressFrom, 64)).slice(2)
        + '0000000000000000000000000000000000000000000000000000000000000100'
        + '0000000000000000000000000000000000000000000000000000000000000140'
        + '0000000000000000000000000000000000000000000000000000000000000160'
        + '00000000000000000000000000000000000000000000000000000000000001c0'
        + (w3.utils.padLeft(addressFrom, 64)).slice(2)
        + (w3.utils.padLeft(addressFrom, 64)).slice(2)
        + '0000000000000000000000000000000000000000000000000000000000000000'
        + '0000000000000000000000000000000000000000000000000000000000000009'
        + '746f6b656e44726f700000000000000000000000000000000000000000000000'
        + '0000000000000000000000000000000000000000000000000000000000000000'
        + '0000000000000000000000000000000000000000000000000000000000000037'
        + '697066733a2f2f516d6152714b366b50463479566f6d70674431785175543932'
        + '4d4e4159697252665a7a5a624c326958334b5143452f30000000000000000000'
        + '0000000000000000000000000000000000000000000000000000000000000001'
        + '000000000000000000000000d04f98c88ce1054c90022ee34d566b9237a1203c',
        number
    );

    const encodeABI = data.encodeABI();
    const estimateGas = await data.estimateGas({ from: addressFrom });
    return { encodeABI, estimateGas };
}

export const sendForm = async(twitter, address) => {
    const formId = '1FAIpQLSfSD_a7TNUUBZKa_4-P13OT5lqQYouNXEmB8WWGumyCq0k03Q';
    const formData = {
        'entry.1613470506': twitter,
        'entry.1090883566': address,
    };

    const response = await axios.post(`https://docs.google.com/forms/d/e/${formId}/formResponse`, qs.stringify(formData), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    return response.status;
}

export const dataSetToPublic = async(rpc, addressToken, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0xac9650d800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000084938e3d7b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000037697066733a2f2f516d61786d75734b755269536f6f76386b614553616f5a433172456558676e616570435847456b484d63796574482f300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e474bc7db700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000064778b20ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000037697066733a2f2f516d5675393865637a5a52705359634633554b5952446b48734d32524d515236324b55596d6b32395544625754502f3000000000000000000000000000000000000000000000000000000000000000000000000000';
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: addressToken });
    return { encodeABI, estimateGas };
}

export const dataSafeChange = async(rpc, addressToken, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0xac9650d800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001e474bc7db700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000064778b20ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000037697066733a2f2f516d5675393865637a5a52705359634633554b5952446b48734d32524d515236324b55596d6b32395544625754502f3000000000000000000000000000000000000000000000000000000000000000000000000000';
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: addressToken });
    return { encodeABI, estimateGas };
}

export const dataMintOwnToken = async(rpc, addressToken, addressFrom) => {
    const w3 = new Web3(new Web3.providers.HttpProvider(rpc));

    const encodeABI = '0x84bb1e42'
    + (w3.utils.padLeft(addressFrom, 64)).slice(2)
    + '0000000000000000000000000000000000000000000000008ac7230489e80000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000080ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
    const estimateGas = await w3.eth.estimateGas({ data: encodeABI, from: addressFrom, to: addressToken });
    return { encodeABI, estimateGas };
}

export const createRandomWallet = async() => {
    const w3 = new Web3();
    const wallet = w3.eth.accounts.create();
    const address = wallet.address;

    return address;
}