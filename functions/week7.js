import { info,
    timeout,
    generateRandomAmount,
    privateToAddress } from '../tools/other.js';
import { getTokenId,
    dataApprove,
    getGasPrice,
    dataApproveNFT,
    sendEVMTX, 
    getTxData } from '../tools/web3.js';
import fs from 'fs';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import { dataMintENS } from '../tools/ENS.js';
import { dataCreateProfile } from '../tools/lineaster.js';
import { dataMintL2Domen } from '../tools/lineal2.js';
import { dataClaimAtticNFT } from '../tools/attic.js';
import { dataMintVityDiaryNFT, dataVityDiaryCompleteTutorial } from '../tools/vitiDiary.js';
import { dataBattlemonLemon, dataBattlemonMerge, dataBattlemonPickaxe } from '../tools/battlemon.js';
import { dataMoonMintNFT, dataVerifyMoon } from '../tools/moonlight.js';
import { dataReadonMint } from '../tools/readon.js';
import { dataStationClaimUSDC, dataStationCreate, dataStationMint } from '../tools/stationX.js';
import { dataMeetMint, dataMeetRedeem, dataMeetStake } from '../tools/meet.js';
import { dataBridgeETHtoLinea } from '../tools/bridge.js';
dotenv.config();

const output = fs.createWriteStream(`history.log`, { flags: 'a' });
const logger = new console.Console(output);
consoleStamp(console, { format: ':date(HH:MM:ss)' });
consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss)', stdout: output });

const pauseTime = generateRandomAmount(process.env.TIMEOUT_ACTION_SEC_MIN * 1000, process.env.TIMEOUT_ACTION_SEC_MAX * 1000, 0);
const priority = 1.2;

export const bridgeETHToLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const amountETH = generateRandomAmount(process.env.BRIDGE_AMOUNT_MIN * 10**18, process.env.BRIDGE_AMOUNT_MAX * 10**18, 0);

    try {
        await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(6).toString();
            gasPrice = gasPrice < 1 ? '1' : gasPrice;
            await dataBridgeETHtoLinea(info.rpcGoerli, amountETH, address).then(async(res) => {
                await sendEVMTX(info.rpcGoerli, 2, res.estimateGas*2, info.bridge, amountETH, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Bridge ${parseInt(amountETH/10**18)}ETH`));
                logger.log(`Bridge ${parseInt(amountETH/10**18)}ETH`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ENSMint = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMintENS(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ENSLinea, 0.01 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint ENS`));
                logger.log(`Successful Mint ENS`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const LineasterCreateProfile = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataCreateProfile(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.lineaster, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Create Lineaster`));
                logger.log(`Successful Create Lineaster`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const Lineal2MintDomen = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMintL2Domen(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.lineal2, 0.0025 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Lineal2 Domen`));
                logger.log(`Successful Mint Lineal2 Domen`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const AtticMintNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataClaimAtticNFT(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.atticBadge, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Attic NFT`));
                logger.log(`Successful Mint Attic NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const VityDiaryQuest = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataVityDiaryCompleteTutorial(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.vitiDiary, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Complete Tutorial`));
                logger.log(`Successful Complete Tutorial`);
            });
            await timeout(pauseTime);

            await dataMintVityDiaryNFT(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.vitiDiary, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Vity Diary NFT`));
                logger.log(`Successful Mint Vity Diary NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const BattlemonQuest = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        let arrayIds = [];
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataBattlemonPickaxe(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.battlePockaxe, 0.01 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Pickaxe 0.01 ETH`));
                logger.log(`Successful Mint Pickaxe 0.01 ETH`);
            });
            await timeout(pauseTime);

            await dataBattlemonLemon(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.battleLemon, null, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(tx) => {
                    await getTxData(info.rpcLinea, tx.transactionHash).then((logs) => {
                        for (let n = 0; n < logs.length; n += 2) {
                            arrayIds.push(logs[n].topics[3]);
                        }
                    });
                });
                console.log(chalk.yellow(`Successful Mint 4 Green Gem`));
                logger.log(`Successful Mint 4 Green Gem`);
            });
            await timeout(pauseTime);

            await dataBattlemonMerge(info.rpcLinea, arrayIds[0], arrayIds[1], address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.battleLemon, 0.0005 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(tx) => {
                    await getTxData(info.rpcLinea, tx.transactionHash).then((logs) => {
                        arrayIds.push(logs[0].topics[3]);
                    });
                });
                console.log(chalk.yellow(`Successful Merge 2 Green`));
                logger.log(`Successful Merge 2 Green`);
            });
            await timeout(pauseTime);

            await dataBattlemonMerge(info.rpcLinea, arrayIds[2], arrayIds[3], address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.battleLemon, 0.0005 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(tx) => {
                    await getTxData(info.rpcLinea, tx.transactionHash).then((logs) => {
                        arrayIds.push(logs[0].topics[3]);
                    });
                });
                console.log(chalk.yellow(`Successful Merge 2 Green x2`));
                logger.log(`Successful Merge 2 Green x2`);
            });
            await timeout(pauseTime);

            await dataBattlemonMerge(info.rpcLinea, arrayIds[0], arrayIds[2], address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.battleLemon, 0.0005 * 10**18, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Merge 2 Purple to Yellow`));
                logger.log(`Successful Merge 2 Purple to Yellow`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const MoonlightMintNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMoonMintNFT(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.moonlight, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Moonlight NFT`));
                logger.log(`Successful Mint Moonlight NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ReadonMint = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataReadonMint(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.readon, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint Readon Domen`));
                logger.log(`Successful Mint Readon Domen`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const StationXQuest = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataStationCreate(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.stationX, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Create Project`));
                logger.log(`Successful Create Project`);
            });
            await timeout(pauseTime);

            await dataStationClaimUSDC(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.stationXUSDC, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Claim 100 USDC`));
                logger.log(`Successful Claim 100 USDC`);
            });
            await timeout(pauseTime);

            await dataApprove(info.rpcLinea, info.USDC, info.stationX, '0x5f5e100', address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.USDC, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Approve USDC`));
                logger.log(`Successful Approve USDC`);
            });
            await timeout(pauseTime);

            await dataStationMint(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.stationX, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint NFT`));
                logger.log(`Successful Mint NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const MeetQuest = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMeetMint(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.meetNFT, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Mint NFT`));
                logger.log(`Successful Mint NFT`);
            });
            await timeout(pauseTime);

            await dataApproveNFT(info.rpcLinea, info.meetNFT, info.meetStake, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.meetNFT, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Approve NFT`));
                logger.log(`Successful Approve NFT`);
            });
            await timeout(pauseTime);

            let tokenNFT;
            await getTokenId(info.rpcLinea, info.meetNFT, address, 0).then(async(tokenId) => {
                tokenNFT = tokenId;
                await dataMeetStake(info.rpcLinea, tokenId, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.meetStake, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful Stake NFT`));
                    logger.log(`Successful Stake NFT`);
                });
            });
            await timeout(pauseTime);

            await dataMeetRedeem(info.rpcLinea, tokenNFT, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.meetStake, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Redeem NFT`));
                logger.log(`Successful Redeem NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const VerifyMoonlightNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataVerifyMoon(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.moonlight, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful Verify Moonlight NFT`));
                logger.log(`Successful Verify Moonlight NFT`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}