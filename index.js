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
import { dataBridgeETHtoLinea, dataBridgeTokentoLinea } from './tools/bridge.js';
import { dataSwapETHToUSDC } from './tools/DEX.js';
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
    const amountETH = generateRandomAmount(process.env.AMOUNT_ETH_BRIDGE_MIN * 10**18, process.env.AMOUNT_ETH_BRIDGE_MAX * 10**18, 0);

    let isReady;
    while(!isReady) {
        try {
            await getETHAmount(info.rpcGoerli, address).then(async(amountETH) => {
                await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                    if (Number(gasPrice) < 1) {
                        gasPrice = '1.5';
                    } 
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                    if (Number(gasPrice) <= needGasPrice) {
                        /*const amountFee = parseInt(multiply(1000000, gasPrice * 10**9));
                        amountETH = parseInt(multiply(subtract(amountETH, amountFee), random));*/
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

const bridgeTokenToLinea = async(addressToken, privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;
    const tokenName = (Object.keys(info)[Object.values(info).findIndex(e => e == addressToken)]).slice(0, -6);

    let isReady;
    while(!isReady) {
        //APPROVE LP
        console.log(chalk.yellow(`Approve ${tokenName} for HOP Router`));
        logger.log(`Approve ${tokenName} for HOP Router`);
        try {
            await getAmountToken(info.rpcGoerli, addressToken, address).then(async(balance) => {
                await checkAllowance(info.rpcGoerli, addressToken, address, info['bridgeHop' + tokenName]).then(async(res) => {
                    if (Number(res) < balance) {
                        console.log(chalk.yellow(`Start Approve ${tokenName} for Hop Router`));
                        logger.log(`Start Approve ${tokenName} for Hop Router`);
                        await dataApprove(info.rpcGoerli, addressToken, info['bridgeHop' + tokenName], address).then(async(res1) => {
                            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                                if (Number(gasPrice) < 1) { gasPrice = '1.5'; } 
                                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                                await sendGoerliTX(info.rpcGoerli, res1.estimateGas, gasPrice, addressToken, null, res1.encodeABI, privateKey);
                            });
                        });
                    } else if (Number(res) >= balance) {
                        isReady = true;
                        console.log(chalk.magentaBright(`Approve ${tokenName} Successful`));
                        logger.log(`Approve ${tokenName} Successful`);
                    }
                });
            });
            await timeout(pauseTime);
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }

    isReady = false;
    while(!isReady) {
        try {
            await getAmountToken(info.rpcGoerli, addressToken, address).then(async(amountToken) => {
                amountToken = parseInt(amountToken * 0.1);
                await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                    if (Number(gasPrice) < 1) { gasPrice = '1.5'; } 
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                    if (Number(gasPrice) <= needGasPrice) {
                        const gasLimit = generateRandomAmount(700000, 1000000, 0);
                        await dataBridgeTokentoLinea(info.rpcGoerli, amountToken, address).then(async(res) => {
                            console.log(res);
                            await sendGoerliTX(info.rpcGoerli, gasLimit, gasPrice, info['bridgeHop' + tokenName], res.valueTX, res.encodeABI, privateKey);
                            console.log(chalk.yellow(`Bridge ${amountToken / 10**18}${tokenName} to Linea`));
                            logger.log(`Bridge ${amountToken / 10**18}${tokenName} to Linea`);
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

const mintDAI = async(privateKey) => {
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
                await dataMintDAI(info.rpcGoerli, address).then(async(res) => {
                    await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.DAIGoerli, res.valueMint, res.encodeABI, privateKey);
                    console.log(chalk.yellow(`Mint 100 DAI`));
                    logger.log(`Mint 1000 DAI`);
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
                    await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.HOPGoerli, res.valueMint, res.encodeABI, privateKey);
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

const swapETHToUSDC = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } 
                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                if (Number(gasPrice) <= needGasPrice) {
                    //const gasLimit = generateRandomAmount(700000, 1000000, 0);
                    await dataSwapETHToUSDC(info.rpcGoerli, address).then(async(res) => {
                        await sendGoerliTX(info.rpcGoerli, res.estimateGas, gasPrice, info.routerUniswap, res.valueTX, res.encodeABI, privateKey);
                        console.log(chalk.yellow(`Swap ${res.valueTX / 10**18}ETH to USDC`));
                        logger.log(`Bridge ${res.valueTX / 10**18}ETH to USDC`);
                        isReady = true;
                    });
                } else if (Number(gasPrice) > needGasPrice) {
                    console.log(`GasPrice NOW = ${gasPrice} > NEED ${needGasPrice}`);
                    await timeout(5000);
                }
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

console.log();

(async() => {
    const wallet = parseFile('private.txt');
    const mainStage = [
        'Bridge ETH to Linea',
        'Bridge DAI to Linea',
        'Bridge HOP to Linea',
        'Bridge USDC to Linea',
        'Mint DAI',
        'Mint HOP',
        'Swap ETH to USDC'
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
            await bridgeTokenToLinea(info.DAIGoerli, wallet[i]);
        } else if (index == 2) {
            await bridgeTokenToLinea(info.HOPGoerli, wallet[i]);
        } else if (index == 3) {
            await bridgeTokenToLinea(info.USDCGoerli, wallet[i]);
        } else if (index == 4) {
            await mintDAI(wallet[i]);
        } else if (index == 5) {
            await mintHOP(wallet[i]);
        } else if (index == 6) {
            await swapETHToUSDC(wallet[i]);
        }

        await timeout(pauseWalletTime);
    }
    console.log(chalk.bgMagentaBright('Process End!'));
    logger.log('Process End!');
})();