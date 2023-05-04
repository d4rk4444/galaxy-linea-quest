import Web3 from 'web3';
import fs from 'fs';

export const info = {
    rpcGoerli: 'https://rpc.ankr.com/eth_goerli',
    rpcLinea: 'https://rpc.goerli.linea.build',
    explorerGoerli: 'https://goerli.etherscan.io/tx/',
    explorerLinea: 'https://explorer.goerli.linea.build/tx/',
    bridgeHop: '0xd9e10C6b1bd26dE4E2749ce8aFe8Dd64294BcBF5',
    relayerHop: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
    routerHop: '0x7191061D5d4C60f598214cC6913502184BAddf18',
    DAIGoerli: '0xb93cba7013f4557cDFB590fD152d24Ef4063485f',
    HOPGoerli: '0x38aF6928BF1Fd6B3c768752e716C49eb8206e20c',
    approveAmount: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
}

export const timeout = ms => new Promise(res => setTimeout(res, ms));

export const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const generateRandomAmount = (min, max, num) => {
    const amount = Number(Math.random() * (parseFloat(max) - parseFloat(min)) + parseFloat(min));
    return Number(parseFloat(amount).toFixed(num));
}

export const parseFile = (file) => {
    const data = fs.readFileSync(file, "utf-8");
    const array = (data.replace(/[^a-zA-Z0-9\n]/g,'')).split('\n');
    return array;
}

export const privateToAddress = (privateKey) => {
    const w3 = new Web3();
    return w3.eth.accounts.privateKeyToAccount(privateKey).address;
}