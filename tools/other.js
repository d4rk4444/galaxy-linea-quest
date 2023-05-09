import Web3 from 'web3';
import fs from 'fs';

export const info = {
    rpcArbitrum: 'https://1rpc.io/arb',
    rpcGoerli: 'https://goerli.blockpi.network/v1/rpc/public',
    rpcLinea: 'https://consensys-zkevm-goerli-prealpha.infura.io/v3/bc3a1c86920846adb87c3531ea958a8c',
    rpcBSC: 'https://data-seed-prebsc-2-s2.binance.org:8545',
    rpcPolygon: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
    explorerArbitrum: 'https://arbiscan.io/tx/',
    explorerGoerli: 'https://goerli.etherscan.io/tx/',
    explorerLinea: 'https://explorer.goerli.linea.build/tx/',
    explorerBSC: 'https://testnet.bscscan.com/tx/',
    explorerPolygon: 'https://polygonscan.com/tx/',
    bridgeHop: '0xd9e10C6b1bd26dE4E2749ce8aFe8Dd64294BcBF5',
    bridgeZetaChain: '0x7c125C1d515b8945841b3d5144a060115C58725F',
    bridgeHopDAI: '0xAa1603822b43e592e33b58d34B4423E1bcD8b4dC',
    bridgeHopHOP: '0x9051Dc48d27dAb53DbAB9E844f8E48c469603938',
    bridgeHopUSDC: '0x889CD829cE211c92b31fDFE1d75299482839ea2b',
    bridgeCeler: '0x62d06e1e3c6C202B60BE4c0E03ea8d6fcA88165f',
    bridgeLiFi: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
    routerL0Arb: '0x0A9f824C05A74F577A536A8A0c673183a872Dff4',
    relayerHop: '0x81682250D4566B2986A2B33e23e7c52D401B7aB7',
    relayerHopToken: 'B47dE784aB8702eC35c5eAb225D6f6cE476DdD28',
    DAIGoerli: '0xb93cba7013f4557cDFB590fD152d24Ef4063485f',
    HOPGoerli: '0x38aF6928BF1Fd6B3c768752e716C49eb8206e20c',
    USDCGoerli: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    UNIGoerli: '0x41E5E6045f91B61AACC99edca0967D518fB44CFB',
    USDTGoerli: '0xfad6367E97217cC51b4cd838Cc086831f81d38C2',
    BUSDFaucet: '0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8',
    BUSDCeler: '0xeB3Eb991D39Dac92616da64b7c6D5af5cCFf1627',
    routerUniswap: '0x4648a43B2C14Da09FdF82B161150d3F634f40491',
    routerUniswapBSC: '0x9a489505a00cE272eAa5e07Dba6491314CaE3796',
    USDCLinea: '0x636A7ee78faCd079DaBC8f81EDA1D09AA9D440A7',
    DAILinea: '0x8741Ba6225A6BF91f9D73531A98A89807857a2B3',
    HOPLinea: '0x6F03052743CD99ce1b29265E377e320CD24Eb632',
    BNBLinea: '0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4',
    BUSDLinea: '0x7d43AABC515C356145049227CeE54B608342c0ad',
    GalaxyCredBUSD: '274947098521804800',
    GalaxyCredBNB: '274946692416708608',
    GalaxyCredDAI: '275991855301828608',
    GalaxyCredHOP: '275991318925844480',
    GalaxyCredUSDC: '274941939628548096',
    GalaxyCredGETH: '274939582723301376',
    GalaxyCredUNI: '275037291027275776',
    GalaxyCredUSDT: '274948110343118848',
    GalaxyCredFORM: '278493989880635392',
    GalaxyCredAMA: '278500236088483840',
    GalaxyCredRETWEET: '278530352818593792',
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

export const parseProxy = (file) => {
    const data = fs.readFileSync(file, "utf-8");
    const array = (data.replace(/[^a-zA-Z0-9@:.\n]/g,'')).split('\n');
    return array;
}

export const privateToAddress = (privateKey) => {
    const w3 = new Web3();
    return w3.eth.accounts.privateKeyToAccount(privateKey).address;
}