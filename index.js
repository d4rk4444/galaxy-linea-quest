import { info,
    timeout,
    shuffle,
    parseFile,
    generateRandomAmount,
    privateToAddress } from './tools/other.js';
import { checkAllowance,
    getETHAmount,
    getAmountToken,
    dataApprove,
    getGasPrice,
    dataSendToken,
    sendGoerliTX,    
    sendLineaTX} from './tools/web3.js';
import { dataMintDAI, dataMintHOP } from './tools/mint.js';
import { dataBridgeETHtoLinea } from './tools/bridge.js';
import { subtract, multiply, divide, add } from 'mathjs';
import fs from 'fs';
import readline from 'readline-sync';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

const output = fs.createWriteStream(`history.log`, { flags: 'a' });
const logger = new console.Console(output);
consoleStamp(console, { format: ':date(HH:MM:ss)' });
consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss)', stdout: output });

const pauseTime = generateRandomAmount(process.env.TIMEOUT_ACTION_SEC_MIN * 1000, process.env.TIMEOUT_ACTION_SEC_MAX * 1000, 0);

const bridgeETHToLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;
    const random = generateRandomAmount(process.env.PERCENT_BRIDGE_TO_LINEA_MIN / 100, process.env.PERCENT_BRIDGE_TO_LINEA_MAX / 100, 3);

    let isReady;
    while(!isReady) {
        try {
            await getETHAmount(info.rpcGoerli, address).then(async(amountETH) => {
                await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                    if (Number(gasPrice) < 1) {
                        gasPrice = '1.5';
                    }
                    gasPrice = parseFloat((gasPrice * 1.5)).toFixed(4).toString();
                    if (Number(gasPrice) <= needGasPrice) {
                        const amountFee = parseInt(multiply(1000000, gasPrice * 10**9));
                        amountETH = parseInt(multiply(subtract(amountETH, amountFee), random));
                        const gasLimit = generateRandomAmount(700000, 1000000, 0);
                        await dataBridgeETHtoLinea(info.rpcGoerli, amountETH, address).then(async(res) => {
                            await sendGoerliTX(info.rpcGoerli, gasLimit, gasPrice, info.bridgeHop, res.valueTX, res.encodeABI, privateKey);
                            console.log(chalk.yellow(`Bridge ${amountETH / 10**18}ETH to Linea`));
                            logger.log(`Bridge ${amountETH / 10**18}ETH to Linea`);
                            isReady = true;
                        });
                    } else if (Number(gasPrice) > needGasPrice) {
                        console.log(`GasPrice NOW = ${gasPrice} > NEED ${needGasPrice}`);
                        await timeout(5000);
                    }
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

const mintHOP = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } else {
                    gasPrice = parseFloat((gasPrice * 3)).toFixed(4).toString();
                }
                await dataMintHOP(info.rpcGoerli, address).then(async(res) => {
                    await sendLineaTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.HOPGoerli, res.valueMint, res.encodeABI, privateKey);
                    console.log(chalk.yellow(`Mint 1000 HOP`));
                    logger.log(`Mint 1000 HOP`);
                    isReady = true;
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

(async() => {
    const wallet = parseFile('private.txt');
    const mainStage = [
        'Bridge ETH to Linea',
        'Mint HOP',
    ];

    const index = readline.keyInSelect(mainStage, 'Choose stage!');
    if (index == -1) { process.exit() };
    console.log(chalk.green(`Start ${mainStage[index]}`));
    logger.log(`Start ${mainStage[index]}`);
    
    for (let i = 0; i < wallet.length; i++) {
        let pauseWalletTime = generateRandomAmount(process.env.TIMEOUT_WALLET_SEC_MIN * 1000, process.env.TIMEOUT_WALLET_SEC_MAX * 1000, 0);
        try {
            console.log(chalk.blue(`Wallet ${i+1}: ${privateToAddress(wallet[i])}`));
            logger.log(`Wallet ${i+1}: ${privateToAddress(wallet[i])}`);
        } catch (err) { throw new Error('Error: Add Private Keys!') };

        if (index == 0) { //BRIDGE STAGE
            await bridgeETHToLinea(wallet[i]);
        } else if (index == 1) {
            await mintHOP(wallet[i]);
        }

        await timeout(pauseWalletTime);
    }
    console.log(chalk.bgMagentaBright('Process End!'));
    logger.log('Process End!');
})();