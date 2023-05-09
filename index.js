import { info,
    timeout,
    shuffle,
    parseFile,
    generateRandomAmount,
    privateToAddress, 
    parseProxy} from './tools/other.js';
import { checkAllowance,
    getETHAmount,
    getAmountToken,
    dataApprove,
    getGasPrice,
    dataSendToken,
    sendGoerliTX,    
    sendLineaTX,
    sendEVMTX } from './tools/web3.js';
import { dataMintBUSD, dataMintDAI, dataMintHOP, dataMintUNI, dataMintUSDT } from './tools/mint.js';
import { dataBridgeETHtoGoerli, dataBridgeETHtoLinea, dataBridgeTokentoLinea, dataBridgeZetaChainBSC } from './tools/bridge.js';
import { dataSwapBNBToBUSD, dataSwapETHToUSDC } from './tools/DEX.js';
import { dataBridgeBNBToLinea, dataBridgeBUSDToLinea } from './tools/celer.js';
import { dataBridgeUSDTToLinea, dataBridgeUNIToLinea } from './tools/LiFi.js';
import { balancePoints, claimPoints, verifyCred } from './tools/galaxy.js';
import { testProxy, sendForm } from './tools/google.js';
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

const bridgeETHToGoerli = async(privateKey) => {
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

const mintDAI = async(privateKey) => {
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

const mintUSDT = async(privateKey) => {
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

const mintUNI = async(privateKey) => {
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

const bridgeETHToLinea = async(privateKey) => {
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

const bridgeETHToBSC = async(privateKey) => {
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
                        await sendGoerliTX(info.rpcGoerli, parseInt(res.estimateGas*1.5), gasPrice, info.bridgeZetaChain, amountETH, res.encodeABI, privateKey);
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

const bridgeBNBToLinea = async(privateKey) => {
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

const bridgeBUSDToLinea = async(privateKey) => {
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

const bridgeLiFiToLinea = async(addressToken, privateKey) => {
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

const mintBUSD = async(privateKey) => {
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

const galaxyVerifyCred = async(credArray, privateKey) => {
    const address = privateToAddress(privateKey);

    for (let i = 0; i < credArray.length; i++) {
        try {
            await verifyCred(info['GalaxyCred' + credArray[i]], address).then((res) => {
                if (res) {
                    console.log(chalk.green(`Verify ${credArray[i]} Successful`));
                    logger.log(`Verify ${credArray[i]} Successful`);
                } else if (!res) {
                    console.log(chalk.gray(`${credArray[i]} Not ready yet`));
                    logger.log(`${credArray[i]} Not ready yet`);
                }
            });
        } catch (err) {
            logger.log(err);
            console.log(err.message);
            return;
        }
    }
}

const galaxyClaimPoints = async(campaignID, privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await claimPoints(campaignID, address).then((res) => {
            if (res) {
                console.log(chalk.green(`Claim Successful`));
                logger.log(`Claim Successful`);
            } else if (!res) {
                console.log(chalk.gray(`Error Claim`));
                logger.log(`Error Claim`);
            }
        });
    } catch (err) {
        logger.log(err);
        console.log(err.message);
        return;
    }
}

const checkBalancePoints = async(campaignID, privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await balancePoints(campaignID, address).then((res) => {
            console.log(chalk.magentaBright(`${res} points`));
            logger.log(`${res} points`);
        });
    } catch (err) {
        logger.log(err);
        console.log(err.message);
        return;
    }
}

const checkProxy = async(proxy) => {
    try {
        const host = (proxy.split('@')[1]).slice(0, -6);
        await testProxy(proxy).then((res) => {
            if (res) {
                console.log(chalk.magentaBright(`Proxy Working ${host} ${res.country}/${res.city}`));
                logger.log(`Proxy Working ${host} ${res.country}/${res.city}`);
            } else if (!res) {
                console.log(chalk.gray(`Proxy ${host} not working`));
                logger.log(`Proxy ${host} not working`);
            }
        });
    } catch (err) {
        logger.log(err);
        console.log(err.message);
        return;
    }
}

const sendGoogleForm = async(proxy, privateKey) => {
    try {
        const address = privateToAddress(privateKey);
        const host = (proxy.split('@')[1]).slice(0, -6);
        console.log(chalk.blue(`Proxy: ${host}`));
        logger.log(`Proxy: ${host}`);

        const answers = ['🌕', '🚀', '➰', '💆‍♀️', '✨', '〰️', '🌙', '🪄', '💫', '🏹', '🛼', '☎️', '🏁'];
        const answer = generateRandomAmount(0, answers.length - 1, 0);

        await sendForm(proxy, address, answers[answer]).then((res) => {
            if (res == 200) {
                console.log(chalk.magentaBright(`Form sent successfully. Answer: ${answers[answer]}`));
                logger.log(`Form sent successfully. Answer: ${answers[answer]}`);
            }
        });
    } catch (err) {
        logger.log(err.message);
        console.log(err.message);
        return;
    }
}


(async() => {
    const wallet = parseFile('private.txt');
    const mainStage = [
        'START',
        'HOP Bridge',
        'CELER Bridge',
        'LiFi Bridge',
        'GALAXY',
        'WEEK 2',
        'OTHER'
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
        'Bridge USDC to Linea'
    ];

    const celerStage = [
        'Mint BUSD',
        'Bridge BNB -> Linea',
        'Bridge BUSD -> Linea',
    ];

    const lifiStage = [
        'Bridge USDT -> Linea',
        'Bridge UNI -> Linea'
    ];

    const galaxyStage = [
        'Verify WEEK 1',
        'Verify WEEK 2',
        'Claim Points WEEK 1',
        'Claim Points WEEK 2',
        'Balance Points WEEK 1',
        'Balance Points WEEK 2'
    ];

    const week2Stage = [
        'Test Proxy',
        'Send Form'
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
        index5 = readline.keyInSelect(galaxyStage, 'Choose stage!');
        if (index5 == -1) { process.exit() };
        console.log(chalk.green(`Start ${galaxyStage[index5]}`));
        logger.log(`Start ${galaxyStage[index5]}`);
    } else if (index == 5) {
        index6 = readline.keyInSelect(week2Stage, 'Choose stage!');
        if (index6 == -1) { process.exit() };
        console.log(chalk.green(`Start ${week2Stage[index6]}`));
        logger.log(`Start ${week2Stage[index6]}`);
    } else if (index == 6) {
        index7 = readline.keyInSelect(otherStage, 'Choose stage!');
        if (index7 == -1) { process.exit() };
        console.log(chalk.green(`Start ${otherStage[index7]}`));
        logger.log(`Start ${otherStage[index7]}`);
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
        }

        if (index3 == 0) { //CELER STAGE
            await mintBUSD(wallet[i]);
        } else if (index3 == 1) {
            await bridgeBNBToLinea(wallet[i]);
        } else if (index3 == 2) {
            await bridgeBUSDToLinea(wallet[i]);
        }

        if (index4 == 0) { //LIFI STAGE
            await bridgeLiFiToLinea(info.USDTGoerli, wallet[i]);
        } else if (index4 == 1) {
            await bridgeLiFiToLinea(info.UNIGoerli, wallet[i]);
        }

        if (index5 == 0) { //GALAXY STAGE
            await galaxyVerifyCred(['USDC', 'GETH', 'DAI', 'HOP', 'BUSD', 'BNB', 'UNI', 'USDT'], wallet[i]);
        } else if (index5 == 1) {
            await galaxyVerifyCred(['FORM', 'AMA', 'RETWEET'], wallet[i]);
        } else if (index5 == 2) {
            await galaxyClaimPoints('GCd1YUZyrN', wallet[i]);
        } else if (index5 == 3) {
            await galaxyClaimPoints('GCPRsUEZhR', wallet[i]);
        } else if (index5 == 4) {
            await checkBalancePoints('GCd1YUZyrN', wallet[i]);
        } else if (index5 == 5) {
            await checkBalancePoints('GCPRsUEZhR', wallet[i]);
        }

        if (index6 == 0) { //WEEK2 STAGE
            const proxyList = parseProxy('proxy.txt');
            await checkProxy(proxyList[i]);
        } else if (index6 == 1) {
            const proxyList = parseProxy('proxy.txt');
            await sendGoogleForm(proxyList[i], wallet[i]);
        }

        if (index7 == 0) { //OTHER STAGE
            pauseWalletTime = 0;
            await getBalanceWallet(wallet[i]);
        } else if (index7 == 1) {
            pauseWalletTime = 0;
            await getBalanceWalletLinea(wallet[i]);
        }

        await timeout(pauseWalletTime);
    }
    console.log(chalk.bgMagentaBright('Process End!'));
    logger.log('Process End!');
})();