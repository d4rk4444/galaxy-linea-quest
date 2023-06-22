import { info,
    timeout,
    shuffle,
    parseFile,
    generateRandomAmount,
    privateToAddress, 
    parseProxy } from './tools/other.js';
import { checkAllowance,
    getETHAmount,
    getAmountToken,
    dataApprove,
    getGasPrice,
    dataSendToken,
    sendGoerliTX,    
    sendLineaTX,
    sendEVMTX } from './tools/web3.js';
import { checkBalancePoints, galaxyClaimPoints, galaxyVerifyCred } from './functions/galaxy.js';
import { bridgeBNBToLinea, bridgeBUSDToLinea, bridgeETHToBSC,
    bridgeETHToGoerli,
    bridgeETHToLinea,
    bridgeLiFiToLinea,
    bridgeTokenToLinea,
    mintBUSD,
    mintDAI,
    mintHOP,
    mintUNI,
    mintUSDT,
    swapETHToUSDC,  } from './functions/week1.js';
import { bilinearBuyNFT,
    bilinearCreateAndSellNFT,
    bilinearMintCollection,
    bilinearMintGameNFT,
    ghostCollateralOwnNFT,
    ghostCollateralСollection,
    ghostCreateCollection,
    ghostMintFreeNFT,
    ghostUncollateralCollectionNFT,
    ghostUncollateralOwnNFT,
    nftsMeChangeToPublic,
    nftsMeCreateCollection, nftsMeCreateEsitionCollection, zonicTransferNFT } from './functions/week3.js';
import { subtract, multiply, divide, add } from 'mathjs';
import fs from 'fs';
import readline from 'readline-sync';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import { thirdCreateTokenDrop, thirdSecondStage } from './functions/week5.js';
dotenv.config();

const output = fs.createWriteStream(`history.log`, { flags: 'a' });
const logger = new console.Console(output);
consoleStamp(console, { format: ':date(HH:MM:ss)' });
consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss)', stdout: output });

const pauseTime = generateRandomAmount(process.env.TIMEOUT_ACTION_SEC_MIN * 1000, process.env.TIMEOUT_ACTION_SEC_MAX * 1000, 0);

const getBalanceWallet = async(privateKey) => {
    const address = privateToAddress(privateKey);

    await getETHAmount(info.rpcArbitrum, address).then(async(res) => {
        console.log(chalk.magentaBright('Balance Arbitrum'));
        logger.log('Balance Arbitrum');
        console.log(`${parseFloat(res / 10**18).toFixed(4)}ETH`);
        logger.log(`${parseFloat(res / 10**18).toFixed(4)}ETH`);
    });
    await getETHAmount(info.rpcGoerli, address).then(async(res) => {
        console.log(chalk.magentaBright('Balance Goerli'));
        logger.log('Balance Goerli');
        console.log(`${parseFloat(res / 10**18).toFixed(4)}ETH`);
        logger.log(`${parseFloat(res / 10**18).toFixed(4)}ETH`);
        await getAmountToken(info.rpcGoerli, info.DAIGoerli, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**18).toFixed(2)}DAI`);
            logger.log(`${parseFloat(res1 / 10**18).toFixed(2)}DAI`);
        });
        await getAmountToken(info.rpcGoerli, info.USDCGoerli, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**6).toFixed(2)}USDC`);
            logger.log(`${parseFloat(res1 / 10**6).toFixed(2)}USDC`);
        });
        await getAmountToken(info.rpcGoerli, info.UNIGoerli, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**18).toFixed(2)}UNI`);
            logger.log(`${parseFloat(res1 / 10**18).toFixed(2)}UNI`);
        });
        await getAmountToken(info.rpcGoerli, info.USDTGoerli, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**6).toFixed(2)}USDT`);
            logger.log(`${parseFloat(res1 / 10**6).toFixed(2)}USDT`);
        });
        await getAmountToken(info.rpcGoerli, info.HOPGoerli, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**18).toFixed(2)}HOP`);
            logger.log(`${parseFloat(res1 / 10**18).toFixed(2)}HOP`);
        });
    });
    await getETHAmount(info.rpcBSC, address).then(async(res) => {
        console.log(chalk.magentaBright('Balance BSC'));
        logger.log('Balance BSC');
        console.log(`${parseFloat(res / 10**18).toFixed(4)}BNB`);
        logger.log(`${parseFloat(res / 10**18).toFixed(4)}BNB`);
        await getAmountToken(info.rpcBSC, info.BUSDCeler, address).then(async(res1) => {
            console.log(`${parseFloat(res1 / 10**18).toFixed(2)}BUSD`);
            logger.log(`${parseFloat(res1 / 10**18).toFixed(2)}BUSD`);
        });
    });
}

const getBalanceWalletLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);

    await getETHAmount(info.rpcLinea, address).then(async(res) => {
        await timeout(5000);
        await getAmountToken(info.rpcLinea, info.USDCLinea, address).then(async(res1) => {
            console.log(chalk.magentaBright('Balance Linea'));
            console.log(`${parseFloat(res / 10**18).toFixed(4)}ETH`);
            console.log(`${parseFloat(res / 10**18).toFixed(2)}USDC`);
            await timeout(5000);
            await getAmountToken(info.rpcLinea, info.DAILinea, address).then(async(res2) => {
                console.log(`${parseFloat(res2 / 10**18).toFixed(2)}DAI`);
                await timeout(5000);
                await getAmountToken(info.rpcLinea, info.HOPLinea, address).then(async(res3) => {
                    console.log(`${parseFloat(res3 / 10**18).toFixed(2)}HOP`);
                    await timeout(5000);
                    await getAmountToken(info.rpcLinea, info.BNBLinea, address).then(async(res4) => {
                        console.log(`${parseFloat(res4 / 10**18).toFixed(2)}BNB`);
                        await timeout(5000);
                        await getAmountToken(info.rpcLinea, info.BUSDLinea, address).then(async(res5) => {
                            console.log(`${parseFloat(res5 / 10**18).toFixed(2)}BUSD`);
                        });
                    });
                });
            });
        });
    });
}

(async() => {
    const wallet = parseFile('private.txt');
    const mainStage = [
        'START',
        'HOP GOERLI Bridge',
        'CELER BSC Bridge',
        'LiFi GOERLI Bridge',
        'WEEK 3',
        'WEEK 5',
        'GALAXY',
        'OTHER',
    ];

    const startStage = [
        'Bridge ETH Arbitrum -> Goerli [Leyer0]',
        'Bridge BNB Goerli -> BSC zetaChain'
    ];

    const hopStage = [
        'Mint DAI',
        'Mint HOP',
        'Mint USDT',
        'Mint UNI',
        'Swap ETH to USDC',
        'Bridge ETH to Linea',
        'Bridge DAI to Linea',
        'Bridge HOP to Linea',
        'Bridge USDC to Linea',
        'ALL IN ONE'
    ];

    const celerStage = [
        'Mint BUSD',
        'Bridge BNB -> Linea',
        'Bridge BUSD -> Linea',
        'ALL IN ONE'
    ];

    const lifiStage = [
        'Bridge USDT -> Linea',
        'Bridge UNI -> Linea',
        'ALL IN ONE'
    ];

    const week3Stage = [
        'Mint Collection',
        'Create NFT and Sell in Own Collection',
        'Mint Game NFT Zero Mission',
        'Safe Transfer ZONIC',
        'Buy NFT',
        'Create Collection and Drop',
        'Set Collection to Public',
        'Create Edition Collection without Drop',
        'Mint Free NFT',
        'Collateral Own NFT ETH/DAI',
        'Redeem Own NFT ETH/DAI',
        'Create Collection 0.05 ETH',
        'Collateral Collection ETH/DAI',
        'Redeem Collection ETH/DAI',
    ];

    const week5Stage = [
        'Mint Token Drop',
        'Set to Pub/Mint/Send to Quest'
    ];

    const galaxyStage = [
        'Verify WEEK 1',
        'Verify WEEK 2',
        'Verify WEEK 3',
        'Verify WEEK 4',
        'Verify WEEK 5',
        'Claim Points WEEK 1',
        'Claim Points WEEK 2',
        'Claim Points WEEK 3',
        'Claim Points WEEK 4',
        'Claim Points WEEK 5',
        'Balance Points WEEK 1',
        'Balance Points WEEK 2',
        'Balance Points WEEK 3',
        'Balance Points WEEK 4',
        'Balance Points WEEK 5',
    ];

    const otherStage = [
        'Check Balance',
        'Check Balance Linea'
    ];

    const index = readline.keyInSelect(mainStage, 'Choose stage!');
    let index1;
    let index2;
    let index3;
    let index4;
    let index5;
    let index6;
    let index7;
    let index8;
    let index9;
    if (index == -1) { process.exit() };
    console.log(chalk.green(`Start ${mainStage[index]}`));
    logger.log(`Start ${mainStage[index]}`);
    if (index == 0) {
        index1 = readline.keyInSelect(startStage, 'Choose stage!');
        if (index1 == -1) { process.exit() };
        console.log(chalk.green(`Start ${startStage[index1]}`));
        logger.log(`Start ${startStage[index1]}`);
    } else if (index == 1) {
        index2 = readline.keyInSelect(hopStage, 'Choose stage!');
        if (index2 == -1) { process.exit() };
        console.log(chalk.green(`Start ${hopStage[index2]}`));
        logger.log(`Start ${hopStage[index2]}`);
    } else if (index == 2) {
        index3 = readline.keyInSelect(celerStage, 'Choose stage!');
        if (index3 == -1) { process.exit() };
        console.log(chalk.green(`Start ${celerStage[index3]}`));
        logger.log(`Start ${celerStage[index3]}`);
    } else if (index == 3) {
        index4 = readline.keyInSelect(lifiStage, 'Choose stage!');
        if (index4 == -1) { process.exit() };
        console.log(chalk.green(`Start ${lifiStage[index4]}`));
        logger.log(`Start ${lifiStage[index4]}`);
    } else if (index == 4) {
        index5 = readline.keyInSelect(week3Stage, 'Choose stage!');
        if (index5 == -1) { process.exit() };
        console.log(chalk.green(`Start ${week3Stage[index5]}`));
        logger.log(`Start ${week3Stage[index5]}`);
    } else if (index == 5) {
        index6 = readline.keyInSelect(week5Stage, 'Choose stage!');
        if (index6 == -1) { process.exit() };
        console.log(chalk.green(`Start ${week5Stage[index6]}`));
        logger.log(`Start ${week5Stage[index6]}`);
    } else if (index == 6) {
        index7 = readline.keyInSelect(galaxyStage, 'Choose stage!');
        if (index7 == -1) { process.exit() };
        console.log(chalk.green(`Start ${galaxyStage[index7]}`));
        logger.log(`Start ${galaxyStage[index7]}`);
    } else if (index == 7) {
        index8 = readline.keyInSelect(otherStage, 'Choose stage!');
        if (index8 == -1) { process.exit() };
        console.log(chalk.green(`Start ${otherStage[index8]}`));
        logger.log(`Start ${otherStage[index8]}`);
    }
    
    for (let i = 0; i < wallet.length; i++) {
        let pauseWalletTime = generateRandomAmount(process.env.TIMEOUT_WALLET_SEC_MIN * 1000, process.env.TIMEOUT_WALLET_SEC_MAX * 1000, 0);
        try {
            console.log(chalk.blue(`Wallet ${i+1}: ${privateToAddress(wallet[i])}`));
            logger.log(`Wallet ${i+1}: ${privateToAddress(wallet[i])}`);
        } catch (err) { throw new Error('Error: Add Private Keys!') };

        if (index1 == 0) { //START STAGE
            await bridgeETHToGoerli(wallet[i]);
        } else if (index1 == 1) {
            await bridgeETHToBSC(wallet[i]);
        }

        if (index2 == 0) { //HOP STAGE
            await mintDAI(wallet[i]);
        } else if (index2 == 1) {
            await mintHOP(wallet[i]);
        } else if (index2 == 2) {
            await mintUSDT(wallet[i]);
        } else if (index2 == 3) {
            await mintUNI(wallet[i]);
        } else if (index2 == 4) {
            await swapETHToUSDC(wallet[i]);
        } else if (index2 == 5) {
            await bridgeETHToLinea(wallet[i]);
        } else if (index2 == 6) {
            await bridgeTokenToLinea(info.DAIGoerli, wallet[i]);
        } else if (index2 == 7) {
            await bridgeTokenToLinea(info.HOPGoerli, wallet[i]);
        } else if (index2 == 8) {
            await bridgeTokenToLinea(info.USDCGoerli, wallet[i]);
        } else if (index2 == 9) {
            const hopBridge = [mintDAI, mintHOP, mintUSDT, mintUNI, swapETHToUSDC];
            shuffle(hopBridge);
            for (let n = 0; n < hopBridge.length; n++) {
                await timeout(pauseTime);
                await hopBridge[n](wallet[i]);
            }
            await bridgeETHToLinea(wallet[i]);
            const hopBridge2 = [info.DAIGoerli, info.HOPGoerli, info.USDCGoerli];
            shuffle(hopBridge2);
            for (let n = 0; n < hopBridge2.length; n++) {
                await timeout(pauseTime);
                await bridgeTokenToLinea(hopBridge2[n], wallet[i]);
            }
        }

        if (index3 == 0) { //CELER STAGE
            await mintBUSD(wallet[i]);
        } else if (index3 == 1) {
            await bridgeBNBToLinea(wallet[i]);
        } else if (index3 == 2) {
            await bridgeBUSDToLinea(wallet[i]);
        } else if (index3 == 3) {
            await mintBUSD(wallet[i]);
            const celerBridge = [bridgeBNBToLinea, bridgeBUSDToLinea];
            shuffle(celerBridge);
            for (let n = 0; n < celerBridge.length; n++) {
                await timeout(pauseTime);
                await celerBridge[n](wallet[i]);
            }
        }

        if (index4 == 0) { //LIFI STAGE
            await bridgeLiFiToLinea(info.USDTGoerli, wallet[i]);
        } else if (index4 == 1) {
            await bridgeLiFiToLinea(info.UNIGoerli, wallet[i]);
        } else if (index4 == 2) {
            const lifiBridge = [info.USDTGoerli, info.UNIGoerli];
            shuffle(lifiBridge);
            for (let n = 0; n < lifiBridge.length; n++) {
                await timeout(pauseTime);
                await bridgeLiFiToLinea(lifiBridge[n], wallet[i]);
            }
        }

        if (index5 == 0) { //WEEK3 STAGE
            await bilinearMintCollection(wallet[i]);
        } else if (index5 == 1) {
            await bilinearCreateAndSellNFT(wallet[i]);
        } else if (index5 == 2) {
            await bilinearMintGameNFT(wallet[i]);
        } else if (index5 == 3) {
            await zonicTransferNFT(wallet[i]);
        } else if (index5 == 4) {
            await bilinearBuyNFT(wallet[i]);
        } else if (index5 == 5) {
            await nftsMeCreateCollection(wallet[i]);
        } else if (index5 == 6) {
            await nftsMeChangeToPublic(wallet[i]);
        } else if (index5 == 7) {
            await nftsMeCreateEsitionCollection(wallet[i]);
        } else if (index5 == 8) {
            await ghostMintFreeNFT(wallet[i]);
        } else if (index5 == 9) {
            await ghostCollateralOwnNFT(wallet[i]);
        } else if (index5 == 10) {
            await ghostUncollateralOwnNFT(wallet[i]);
        } else if (index5 == 11) {
            await ghostCreateCollection(wallet[i]);
        } else if (index5 == 12) {
            await ghostCollateralСollection(wallet[i]);
        } else if (index5 == 13) {
            await ghostUncollateralCollectionNFT(wallet[i]);
        }

        if (index6 == 0) { //WEEK5 STAGE
            await thirdCreateTokenDrop(wallet[i]);
        } else if (index6 == 1) {
            await thirdSecondStage(wallet[i]);
        }

        if (index7 == 0) { //GALAXY STAGE //WEEK 1
            pauseWalletTime = 0;
            await galaxyVerifyCred(['USDC', 'GETH', 'DAI', 'HOP', 'BUSD', 'BNB', 'UNI', 'USDT'], wallet[i]);
        } else if (index7 == 1) { //WEEK 2
            pauseWalletTime = 0;
            await galaxyVerifyCred(['FORM', 'AMA', 'RETWEET'], wallet[i]);
        } else if (index7 == 2) { //WEEK 3
            pauseWalletTime = 0;
            await galaxyVerifyCred(['NFTsCreate',
                'NFTsToPublic',
                'NFTsMint',
                'NFTsAirDrop',
                'NFTsGatedContent',
                'GhostFree',
                'GhostCreate',
                'GhostCollateralNFT',
                'GhostRedeemNFT',
                'GhostCollateralColl',
                'GhostRedeemColl',
                'BilinearCreate',
                'BilinearMint', 'BilinearBuy', 'BilinearSell', 'BilinearMintGame', 'ZonicTransfer'], wallet[i]);
        } else if (index7 == 3) { //WEEK 4
            pauseWalletTime = 0;
            await galaxyVerifyCred(['Youtube', 'Retweet', 'Snapshot'], wallet[i]);
        } else if (index7 == 4) { //WEEK 5
            pauseWalletTime = 0;
            await galaxyVerifyCred(['Hapi',
                'ThirdwebDeploy',
                'ThirdwebClaimable', 'ThirdwebClaim', 'ThirdwebTransfer', 'GoPlus'], wallet[i]);
        } else if (index7 == 5) { //WEEK 1
            pauseWalletTime = 0;
            await galaxyClaimPoints('GCd1YUZyrN', wallet[i]);
        } else if (index7 == 6) { //WEEK 2
            pauseWalletTime = 0;
            await galaxyClaimPoints('GCPRsUEZhR', wallet[i]);
        } else if (index7 == 7) { //WEEK 3
            pauseWalletTime = 0;
            await galaxyClaimPoints('GCEMnUEySZ', wallet[i]);
        } else if (index7 == 8) { //WEEK 4
            pauseWalletTime = 0;
            await checkBalancePoints('GCEMnUEySZ', wallet[i]);
        } else if (index7 == 9) { //WEEK 5
            pauseWalletTime = 0;
            await galaxyClaimPoints('GC8ofUNp65', wallet[i]);
        } else if (index7 == 10) { //WEEK 1
            pauseWalletTime = 0;
            await checkBalancePoints('GCd1YUZyrN', wallet[i]);
        } else if (index7 == 11) { //WEEK 2
            pauseWalletTime = 0;
            await checkBalancePoints('GCPRsUEZhR', wallet[i]);
        } else if (index7 == 12) { //WEEK 3
            pauseWalletTime = 0;
            await galaxyClaimPoints('GC9kPUX6pP', wallet[i]);
        } else if (index7 == 13) { //WEEK 4
            pauseWalletTime = 0;
            await checkBalancePoints('GC9kPUX6pP', wallet[i]);
        } else if (index7 == 14) { //WEEK 5
            pauseWalletTime = 0;
            await checkBalancePoints('GC8ofUNp65', wallet[i]);
        }

        if (index8 == 0) { //OTHER STAGE
            pauseWalletTime = 0;
            await getBalanceWallet(wallet[i]);
        } else if (index8 == 1) {
            pauseWalletTime = 0;
            await getBalanceWalletLinea(wallet[i]);
        }

        await timeout(pauseWalletTime);
    }
    console.log(chalk.bgMagentaBright('Process End!'));
    logger.log('Process End!');
})();