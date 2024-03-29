import { info,
    timeout,
    shuffle,
    parseFile,
    generateRandomAmount,
    privateToAddress, 
    parseProxy} from '../tools/other.js';
import { checkAllowance,
    getETHAmount,
    getAmountToken,
    dataApprove,
    getGasPrice,
    dataSendToken,
    sendGoerliTX,    
    sendLineaTX,
    sendEVMTX } from '../tools/web3.js';
import { dataMintBUSD, dataMintDAI, dataMintHOP, dataMintUNI, dataMintUSDT } from '../tools/mint.js';
import { dataBridgeETHtoGoerli, dataBridgeETHtoLinea, dataBridgeTokentoLinea, dataBridgeZetaChainBSC } from '../tools/bridge.js';
import { dataSwapBNBToBUSD, dataSwapETHToUSDC } from '../tools/DEX.js';
import { dataBridgeBNBToLinea, dataBridgeBUSDToLinea } from '../tools/celer.js';
import { dataBridgeUSDTToLinea, dataBridgeUNIToLinea } from '../tools/LiFi.js';
import { subtract, multiply, divide, add } from 'mathjs';
import fs from 'fs';
import consoleStamp from 'console-stamp';
import chalk from 'chalk';

const output = fs.createWriteStream(`history.log`, { flags: 'a' });
const logger = new console.Console(output);
consoleStamp(console, { format: ':date(HH:MM:ss)' });
consoleStamp(logger, { format: ':date(yyyy/mm/dd HH:MM:ss)', stdout: output });

const pauseTime = generateRandomAmount(process.env.TIMEOUT_ACTION_SEC_MIN * 1000, process.env.TIMEOUT_ACTION_SEC_MAX * 1000, 0);

export const bridgeETHToGoerli = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const random = generateRandomAmount(process.env.PERCENT_ETH_BRIDGE_MIN / 100, process.env.PERCENT_ETH_BRIDGE_MAX / 100, 3);

    let isReady;
    while(!isReady) {
        try {
            await getETHAmount(info.rpcArbitrum, address).then(async(amountETH) => {
                await getGasPrice(info.rpcArbitrum).then(async(gasPrice) => {
                    await dataBridgeETHtoGoerli(info.rpcArbitrum, 0.0001*10**18, address).then(async(res) => {
                        const amountFee = multiply(res.estimateGas, gasPrice * 10**9);
                        amountETH = parseInt(multiply(subtract(subtract(amountETH, amountFee), 0.0008 * 10**18), random));
                        await dataBridgeETHtoGoerli(info.rpcArbitrum, amountETH, address).then(async(res1) => {
                            await sendEVMTX(info.rpcArbitrum, 2, res1.estimateGas, info.routerL0Arb, res1.valueTX, res1.encodeABI, privateKey, gasPrice, gasPrice);
                            console.log(chalk.yellow(`Bridge ${amountETH / 10**18}ETH to Goerli`));
                            logger.log(`Bridge ${amountETH / 10**18}ETH to Goerli`);
                            isReady = true;
                        });
                    });
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

export const mintDAI = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } else {
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                }
                await dataMintDAI(info.rpcGoerli, address).then(async(res) => {
                    await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.DAIGoerli, res.valueMint, res.encodeABI, privateKey);
                    console.log(chalk.yellow(`Mint 100 DAI`));
                    logger.log(`Mint 100 DAI`);
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

export const mintHOP = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } else {
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
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

export const mintUSDT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } else {
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                }
                await dataMintUSDT(info.rpcGoerli, address).then(async(res) => {
                    await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.USDTGoerli, res.valueMint, res.encodeABI, privateKey);
                    console.log(chalk.yellow(`Mint 100 USDT`));
                    logger.log(`Mint 100 USDT`);
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

export const mintUNI = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } else {
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                }
                await dataMintUNI(info.rpcGoerli, address).then(async(res) => {
                    await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.UNIGoerli, res.valueMint, res.encodeABI, privateKey);
                    console.log(chalk.yellow(`Mint 10 UNI`));
                    logger.log(`Mint 10 UNI`);
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

export const swapETHToUSDC = async(privateKey) => {
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
                    await dataSwapETHToUSDC(info.rpcGoerli, address).then(async(res) => {
                        await sendGoerliTX(info.rpcGoerli, parseInt(res.estimateGas*1.5), gasPrice, info.routerUniswap, res.valueTX, res.encodeABI, privateKey);
                        console.log(chalk.yellow(`Swap ${res.valueTX / 10**18}ETH to USDC`));
                        logger.log(`Swap ${res.valueTX / 10**18}ETH to USDC`);
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

export const bridgeETHToLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;
    const amountETH = generateRandomAmount(process.env.AMOUNT_ETH_BRIDGE_MIN, process.env.AMOUNT_ETH_BRIDGE_MAX, 3) * 1000 + '000000000000000';

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                } 
                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                if (Number(gasPrice) <= needGasPrice) {
                    await dataBridgeETHtoLinea(info.rpcGoerli, amountETH, address).then(async(res) => {
                        await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info.bridgeHop, res.valueTX, res.encodeABI, privateKey);
                        console.log(chalk.yellow(`Bridge ${amountETH / 10**18}ETH to Linea`));
                        logger.log(`Bridge ${amountETH / 10**18}ETH to Linea`);
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

export const bridgeTokenToLinea = async(addressToken, privateKey) => {
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
                        await dataApprove(info.rpcGoerli, addressToken, info['bridgeHop' + tokenName], balance, address).then(async(res1) => {
                            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                                if (Number(gasPrice) < 1) { gasPrice = '1.5'; }
                                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                                await sendEVMTX(info.rpcGoerli, 0, res1.estimateGas, addressToken, null, res1.encodeABI, privateKey, gasPrice);
                            });
                        });
                    } else if (Number(res) >= balance) {
                        isReady = true;
                        console.log(chalk.magentaBright(`Approve ${tokenName} Successful`));
                        logger.log(`Approve ${tokenName} Successful`);
                        await timeout(pauseTime);
                    }
                });
            });
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
                if (tokenName == 'USDC') {
                    amountToken = parseFloat(amountToken / 10**6).toFixed(1) * 10**6;
                }
                amountToken = parseInt(amountToken * 0.1);
                await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                    if (Number(gasPrice) < 1) { gasPrice = '1.5'; } 
                    gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                    if (Number(gasPrice) <= needGasPrice) {
                        console.log(chalk.yellow(`Start bridge ${tokenName} to Linea`));
                        logger.log(`Start bridge ${tokenName} to Linea`);
                        await dataBridgeTokentoLinea(info.rpcGoerli, info['bridgeHop' + tokenName], amountToken, address).then(async(res) => {
                            await sendGoerliTX(info.rpcGoerli, res.estimateGas*2, gasPrice, info['bridgeHop' + tokenName], res.valueTX, res.encodeABI, privateKey);
                            const decimalsTkn = addressToken == info.USDCGoerli ? 6 : 18;
                            console.log(chalk.yellow(`Bridge ${amountToken / 10**decimalsTkn}${tokenName} to Linea`));
                            logger.log(`Bridge ${amountToken / 10**decimalsTkn}${tokenName} to Linea`);
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

export const bridgeETHToBSC = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;

    let isReady;
    while(!isReady) {
        try {
            const amountETH = generateRandomAmount(0.15 * 10**18, 0.18 * 10**18, 0);
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                }
                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                if (Number(gasPrice) <= needGasPrice) {
                    await dataBridgeZetaChainBSC(info.rpcGoerli, amountETH, address).then(async(res) => {
                        await sendGoerliTX(info.rpcGoerli, generateRandomAmount(60000, 80000, 0), gasPrice, info.bridgeZetaChain, amountETH, res.encodeABI, privateKey);
                        console.log(chalk.yellow(`Bridge ${amountETH / 10**18}ETH to BSC`));
                        logger.log(`Bridge ${amountETH / 10**18}ETH to BSC`);
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

export const bridgeBNBToLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            const amountETH = generateRandomAmount(0.01, 0.015, 3) * 10**18;
            await getGasPrice(info.rpcBSC).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * 2)).toFixed(4).toString();
                await dataBridgeBNBToLinea(info.rpcBSC, amountETH, address).then(async(res) => {
                    await sendEVMTX(info.rpcBSC, 0, parseInt(res.estimateGas*1.5), info.bridgeCeler, amountETH, res.encodeABI, privateKey, gasPrice);
                    console.log(chalk.yellow(`Bridge ${amountETH / 10**18}BNB to Celer`));
                    logger.log(`Bridge ${amountETH / 10**18}BNB to Celer`);
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

export const bridgeBUSDToLinea = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        //APPROVE BUSD
        console.log(chalk.yellow(`Approve BUSD for Celer Bridge`));
        logger.log(`Approve BUSD for Celer Bridge`);
        try {
            await getAmountToken(info.rpcBSC, info.BUSDCeler, address).then(async(balance) => {
                await checkAllowance(info.rpcBSC, info.BUSDCeler, address, info.bridgeCeler).then(async(res) => {
                    if (Number(res) < balance) {
                        console.log(chalk.yellow(`Start Approve BUSD for Celer Bridge`));
                        logger.log(`Start Approve BUSD for Celer Bridge`);
                        await dataApprove(info.rpcBSC, info.BUSDCeler, info.bridgeCeler, balance, address).then(async(res1) => {
                            await getGasPrice(info.rpcBSC).then(async(gasPrice) => {
                                gasPrice = parseFloat((gasPrice * 2)).toFixed(4).toString();
                                await sendEVMTX(info.rpcBSC, 0, res1.estimateGas, info.BUSDCeler, null, res1.encodeABI, privateKey, gasPrice);
                            });
                        });
                    } else if (Number(res) >= balance) {
                        isReady = true;
                        console.log(chalk.magentaBright(`Approve BUSD Successful`));
                        logger.log(`Approve BUSD Successful`);
                        await timeout(pauseTime);
                    }
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }

    isReady = false;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcBSC).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * 1.1)).toFixed(4).toString();
                await getAmountToken(info.rpcBSC, info.BUSDCeler, address).then(async(amountBUSD) => {
                    await dataBridgeBUSDToLinea(info.rpcBSC, amountBUSD, address).then(async(res) => {
                        await sendEVMTX(info.rpcBSC, 0, parseInt(res.estimateGas*1.5), info.bridgeCeler, null, res.encodeABI, privateKey, gasPrice);
                        console.log(chalk.yellow(`Bridge ${amountBUSD / 10**18}BUSD to Celer`));
                        logger.log(`Bridge ${amountBUSD / 10**18}BUSD to Celer`);
                        isReady = true;
                    });
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

export const bridgeLiFiToLinea = async(addressToken, privateKey) => {
    const address = privateToAddress(privateKey);
    const needGasPrice = process.env.GAS_PRICE_BRIDGE;
    const tokenName = (Object.keys(info)[Object.values(info).findIndex(e => e == addressToken)]).slice(0, -6);

    let isReady;
    while(!isReady) {
        //APPROVE LP
        console.log(chalk.yellow(`Approve ${tokenName} for Li.Fi Bridge`));
        logger.log(`Approve ${tokenName} for Li.Fi Bridge`);
        try {
            await getAmountToken(info.rpcGoerli, addressToken, address).then(async(balance) => {
                await checkAllowance(info.rpcGoerli, addressToken, address, info.bridgeLiFi).then(async(res) => {
                    if (Number(res) < balance) {
                        console.log(chalk.yellow(`Start Approve ${tokenName} for Li.Fi Bridge`));
                        logger.log(`Start Approve ${tokenName} for Li.Fi Bridge`);
                        await dataApprove(info.rpcGoerli, addressToken, info.bridgeLiFi, balance, address).then(async(res1) => {
                            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                                if (Number(gasPrice) < 1) { gasPrice = '1.5'; }
                                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                                await sendEVMTX(info.rpcGoerli, 0, res1.estimateGas, addressToken, null, res1.encodeABI, privateKey, gasPrice);
                            });
                        });
                    } else if (Number(res) >= balance) {
                        isReady = true;
                        console.log(chalk.magentaBright(`Approve ${tokenName} Successful`));
                        logger.log(`Approve ${tokenName} Successful`);
                        await timeout(pauseTime);
                    }
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }

    isReady = false;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                if (Number(gasPrice) < 1) {
                    gasPrice = '1.5';
                }
                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                if (Number(gasPrice) <= needGasPrice) {
                    console.log(chalk.yellow(`Start Bridge ${tokenName} to Linea`));
                    logger.log(`Start Bridge ${tokenName} to Linea`);
                    const func = addressToken == info.USDTGoerli ? dataBridgeUSDTToLinea : dataBridgeUNIToLinea;
                    await func(info.rpcGoerli, address).then(async(res) => {
                        await sendEVMTX(info.rpcGoerli, 0, parseInt(res.estimateGas*1.2), info.bridgeLiFi, res.valueForTx, res.encodeABI, privateKey, gasPrice);
                        console.log(chalk.yellow(`Bridge ${tokenName} to Li.Fi`));
                        logger.log(`Bridge ${tokenName} to Li.Fi`);
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

export const mintBUSD = async(privateKey) => {
    const address = privateToAddress(privateKey);

    let isReady;
    while(!isReady) {
        try {
            await getGasPrice(info.rpcBSC).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * 1.2)).toFixed(4).toString();
                await dataMintBUSD(info.rpcBSC, address).then(async(res) => {
                    await sendEVMTX(info.rpcBSC, 0, res.estimateGas*2, info.BUSDFaucet, res.valueMint, res.encodeABI, privateKey, gasPrice);
                    console.log(chalk.yellow(`Mint BUSD`));
                    logger.log(`Mint BUSD`);
                    await getAmountToken(info.rpcBSC, info.BUSDCeler, address).then((balanceBUSD) => {
                        if (balanceBUSD > 12 * 10**18) {
                            isReady = true;
                        } else if (balanceBUSD <= 12 * 10**18) {
                            console.log(chalk.yellow(`Balance ${balanceBUSD / 10**18}BUSD < 10 Mint Again`));
                            logger.log(`Balance ${balanceBUSD / 10**18}BUSD < 10 Mint Again`);
                        }
                    });
                });
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}