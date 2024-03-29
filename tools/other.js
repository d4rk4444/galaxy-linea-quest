import Web3 from 'web3';
import fs from 'fs';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

export const log = (type, color, msg) => {
    const output = fs.createWriteStream(`history.log`, { flags: 'a' });
    const logger = new console.Console(output);
    consoleStamp(console, { format: ':date(HH:MM:ss) :label' });
    consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss) :label', stdout: output });

    if (!color) {
        console[type](msg);
    } else {
        console[type](chalk[color](msg));
    }
    logger[type](msg);
}

export const info = {
    rpcArbitrum: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    rpcGoerli: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    rpcLinea: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    rpcBSC: 'https://rpc.ankr.com/bsc',
    rpcPolygon: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
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
    routerL0Arb: '0x0A9f824C05A74F577A536A8A0c673183a872Dff4',
    routerHop: '0x7191061D5d4C60f598214cC6913502184BAddf18',
    bridgeHop: '0xd9e10C6b1bd26dE4E2749ce8aFe8Dd64294BcBF5',
    bridgeLinea: '0xE87d317eB8dcc9afE24d9f63D6C760e52Bc18A40',
    hETH: '0xA49600627D913B61714fF2a205Fb1096f1bceAb2',
    WETH: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    ETHLinea: '0x0000000000000000000000000000000000000000',
    USDCLinea: '0x636A7ee78faCd079DaBC8f81EDA1D09AA9D440A7',
    DAILinea: '0x8741Ba6225A6BF91f9D73531A98A89807857a2B3',
    HOPLinea: '0x6F03052743CD99ce1b29265E377e320CD24Eb632',
    BNBLinea: '0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4',
    BUSDLinea: '0x7d43AABC515C356145049227CeE54B608342c0ad',
    nfts2me: '0x2269bCeB3f4e0AA53D2FC43B1B7C5C5D13B119a5',
    bilinear: '0x3760f70722ddC05bFBfef23C739a3C801A97Aa2b',
    bilinearMarket: '0x7d82f50bf95c04a2d95b64ce9b0c900db763bc1a',
    bilinearBuyableNFT: '0xd2111EE8e74EA340133C7840Eaa80E7Cf48Fab2e',
    lpsumLorem: '0x46717db664947a024990153fd8ff7411fef63d1a',
    zeroMission: '0xe04F59B573Cb4093b3d596863c9F08aC89d44915',
    ghostJohnMC: '0x91ba8A14D2CC851aBb69212c09f59e06e1e7f0a5',
    ghostFreeNFT: '0x9C4c49C3c3bd7ab49D91576d0103A25514CaD1D6',
    ghostCollection: '0x136E29d881DD91349d660B452aFb206e09C94268',
    GalaxyCredNFTsCreate: '280709656117682176',
    GalaxyCredNFTsToPublic: '280710520542765056',
    GalaxyCredNFTsMint: '280711446271795200',
    GalaxyCredNFTsAirDrop: '280711993813016576',
    GalaxyCredNFTsGatedContent: '280712587818737664',
    GalaxyCredGhostFree: '280715312526696448',
    GalaxyCredGhostCreate: '280729315751665664',
    GalaxyCredGhostCollateralNFT: '280730750916665344',
    GalaxyCredGhostRedeemNFT: '280731501755801600',
    GalaxyCredGhostCollateralColl: '280732009316917248',
    GalaxyCredGhostRedeemColl: '280732468668702720',
    GalaxyCredBilinearCreate: '280733387003174912',
    GalaxyCredBilinearMint: '280734010784260096',
    GalaxyCredBilinearBuy: '280734456991096832',
    GalaxyCredBilinearSell: '280734981962768384',
    GalaxyCredBilinearMintGame: '280735643010244608',
    GalaxyCredZonicTransfer: '280738155352203264',
    GalaxyCredYoutube: '284071740062736384',
    GalaxyCredRetweet: '284146897166966784',
    GalaxyCredSnapshot: '283604823812251648',
    thirdWebTokenDrop: '0x76f948e5f13b9a84a81e5681df8682bbf524805e',
    thirdWebQuest: '0x630900fB257fAfEf02491368062d50d6677d9D75',
    hapiQuest: '0x1ed47146ba443D16F67f489800dc5d7786e07c5d',
    GalaxyCredHapi: '285792379786141696',
    GalaxyCredThirdwebDeploy: '285797002374717440',
    GalaxyCredThirdwebClaimable: '285846209370431488',
    GalaxyCredThirdwebClaim: '285846683930763264',
    GalaxyCredThirdwebTransfer: '285847193668722688',
    GalaxyCredGoPlus: '283122116019789824',
    ENSLinea: '0xf9D4b242DCcbB6AB3b3Fea6750bbAb536f925bD3',
    lineaster: '0x407972ca4683803a926a85963f28C71147c6DBdF',
    lineal2: '0x03555948C82A6F473b28b1e7541dc91D1927D52d',
    atticBadge: '0x0E685e48Bb85285B50E0B6aA9208AaCeaF9147fF',
    vitiDiary: '0x6DB87bA2f78d42D9A1c6Adcd04e760EFB277461B',
    battlePockaxe: '0xB0375deF6ABA7687c268bEcac620865b0c1ED120',
    battleLemon: '0x35D42D4BdC36CfE33A5ea6672A1B81752A963d6d',
    moonlight: '0x6084643ca6210551390c4b6c82807106C00291ed',
    readon: '0xB028873223d6f9624368b4Bb488e0aBe6a2F3726',
    stationX: '0xa8136d348d70222019dc0b431DbeaF93B47C8e5B',
    stationXUSDC: '0x5d993Ff7FBCc8d65412d32a79248dFAAB6739047',
    USDC: '0x45a27ea11D159A86AacE1eC24d3ba3d103642D9f',
    meetNFT: '0x82E0b6ADFC1A5d4eF0787Bf941e102D244A393ea',
    meetStake: '0xb622275862ee88848e89f3c97e3e3b39a7e1e536',
    GalaxyCredENS: '290854880366206976',
    GalaxyCredLineasterProfile: '291126920881020928',
    GalaxyCredLineaL2Domen: '291270625768153088',
    GalaxyCredAtticEarly: '290866378186596352',
    GalaxyCredAtticNFT: '291050979051872256',
    GalaxyCredVitiDiaryTutorial: '291101130378354688',
    GalaxyCredVitiDiaryNFT: '291103334086647808',
    GalaxyCredBattlemonNFTGreen: '290812357358821376',
    GalaxyCredBattlemonNFTPickaxe: '290810979680952320',
    GalaxyCredBattlemonNFTGold: '290813379632340992',
    GalaxyCredMoonlightNFT: '290835053211721728',
    GalaxyCredReadonDomen: '288142584648998912',
    GalaxyCredStationXProject: '291933703639834624',
    GalaxyCredStationXUSDC: '291934498305253376',
    GalaxyCredStationXNFT: '291932302029266944',
    GalaxyCredMeetNFT: '290741410379505664',
    GalaxyCredMeetStake: '290745442737233920',
    GalaxyCredMeetRedeem: '290745787815206912',
    bridge: '0x70BaD09280FD342D02fe64119779BC1f0791BAC2',
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

export const updateJsonFile = (address, collection, file) => {
    fs.readFile(file, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log("An error occurred while reading JSON Object from File.");
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            obj[address] = collection;

            const json = JSON.stringify(obj);

            fs.writeFile(file, json, 'utf8', function (err) {
                if (err) {
                    console.log("An error occurred while writing JSON Object to File.");
                    return console.log(err);
                }
                //console.log("JSON file has been updated.");
            });
        }
    });
}

export const checkAddressInJson = (address, file) => {
    const result = fs.readFileSync(file, 'utf8');

    const obj = JSON.parse(result);
    if (obj.hasOwnProperty(address)) {
        return obj[address];
    } else {
        return false;
    }
}