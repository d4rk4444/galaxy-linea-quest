import { info,
    timeout,
    generateRandomAmount,
    privateToAddress, 
    checkAddressInJson,
    updateJsonFile  } from '../tools/other.js';
import { getGasPrice, dataSendToken, sendEVMTX } from '../tools/web3.js';
import { getCollectionAddress,
    dataCreateTokenDrop,
    dataSetToPublic,
    dataSafeChange,
    dataMintOwnToken } from '../tools/thirdWeb.js';
import fs from 'fs';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

const output = fs.createWriteStream(`history.log`, { flags: 'a' });
const logger = new console.Console(output);
consoleStamp(console, { format: ':date(HH:MM:ss)' });
consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss)', stdout: output });

const pauseTime = generateRandomAmount(process.env.TIMEOUT_ACTION_SEC_MIN * 1000, process.env.TIMEOUT_ACTION_SEC_MAX * 1000, 0);
const priority = 1.5;


export const thirdCreateTokenDrop = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataCreateTokenDrop(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.thirdWebTokenDrop, null, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(hash) => {
                    console.log(chalk.yellow(`Successful create Token Drop on ThirdWeb`));
                    logger.log(`Successful create Token Drop on ThirdWeb`);
                    await getCollectionAddress(info.rpcLinea, hash.transactionHash).then((addressColl) => {
                        updateJsonFile(address, addressColl, 'thirdweb.json');
                    });
                });
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const thirdSecondStage = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try{
        const addressColl = checkAddressInJson(address, 'thirdweb.json');
        if (!addressColl) {
            console.log(chalk.red(`Create Drop Token on ThirdWeb`));
            logger.log(`Create Drop Token on ThirdWeb`);
            return;
        } else {
            await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                await dataSetToPublic(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful set to Public`));
                    logger.log(`Successful set to Public`);
                });
                await timeout(pauseTime);

                await dataSafeChange(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful safe change`));
                    logger.log(`Successful safe change`);
                });
                await timeout(pauseTime);

                await dataMintOwnToken(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful Mint 10 token own collection`));
                    logger.log(`Successful Mint 10 token own collection`);
                });
                await timeout(pauseTime);

                await dataSendToken(info.rpcLinea, addressColl, info.thirdWebQuest, 1*10**18, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful Send 1 token to Quest`));
                    logger.log(`Successful Send 1 token to Quest`);
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}