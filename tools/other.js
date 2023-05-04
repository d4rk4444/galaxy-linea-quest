import Web3 from 'web3';
import fs from 'fs';

export const info = {
    rpcArbitrum: 'https://1rpc.io/arb',
    rpcGoerli: 'https://rpc.ankr.com/eth_goerli',
    rpcLinea: 'https://rpc.goerli.linea.build',
    explorerArbitrum: 'https://arbiscan.io/tx/',
    explorerGoerli: 'https://goerli.etherscan.io/tx/',
    explorerLinea: 'https://explorer.goerli.linea.build/tx/',
    bridgeHop: '0xd9e10C6b1bd26dE4E2749ce8aFe8Dd64294BcBF5',
    bridgeZetaChain: '0x7c125C1d515b8945841b3d5144a060115C58725F',
    routerL0Arb: '0x0A9f824C05A74F577A536A8A0c673183a872Dff4',
    relayerHop: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
    bridgeHopDAI: '0xAa1603822b43e592e33b58d34B4423E1bcD8b4dC',
    bridgeHopHOP: '0x9051Dc48d27dAb53DbAB9E844f8E48c469603938',
    bridgeHopUSDC: '0x889CD829cE211c92b31fDFE1d75299482839ea2b',
    relayerHopToken: 'B47dE784aB8702eC35c5eAb225D6f6cE476DdD28',
    DAIGoerli: '0xb93cba7013f4557cDFB590fD152d24Ef4063485f',
    HOPGoerli: '0x38aF6928BF1Fd6B3c768752e716C49eb8206e20c',
    USDCGoerli: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    routerUniswap: '0x4648a43B2C14Da09FdF82B161150d3F634f40491',
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