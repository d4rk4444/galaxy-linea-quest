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
import { dataBuyNftBilinear,
    dataMintBilinearGameNFT,
    dataMintCollectionBilinear,
    dataMintSellNFTBilinear } from '../tools/bilinear.js';
import { dataCreateCollection2ME, dataCreateEditionCollection2ME, dataSetToPublic2ME } from '../tools/nfts2me.js';
import { dataClaimFreeGhost,
    dataCollateralCollectionGhost,
    dataCollateralGhost,
    dataRegisterCollectionGhost,
    dataUncollateralCollectionGhost,
    dataUncollateralGhost } from '../tools/ghost.js';
import { dataSwaphETHToWETH, dataUnwrapETH } from '../tools/DEX.js';
import { dataBridgeETHToLinea, dataBridgeETHtoGoerli } from '../tools/bridge.js';
import { dataSafeTransferZonic } from '../tools/zonic.js';
import { subtract, multiply, divide, add } from 'mathjs';
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

export const bilinearMintCollection = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMintCollectionBilinear(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.bilinear, null, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(hash) => {
                    console.log(chalk.yellow(`Successful create Collection on Bilinear`));
                    logger.log(`Successful create Collection on Bilinear`);
                    await getCollectionAddress(info.rpcLinea, hash.transactionHash).then((addressColl) => {
                        updateJsonFile(address, addressColl, 'bilinear.json');
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

export const bilinearCreateAndSellNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            const addressColl = checkAddressInJson(address, 'bilinear.json');
            if (!addressColl) {
                console.log(chalk.red(`Create Collection in Bilinear before Mint NFT`));
                logger.log(`Create Collection in Bilinear before Mint NFT`);
            } else {
                await dataMintSellNFTBilinear(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Mint/Sell NFT in Own Collection Bilinear`));
                    logger.log(`Mint/Sell NFT in Own Collection Bilinear`);
                });
            }
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const bilinearMintGameNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataMintBilinearGameNFT(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.zeroMission, null, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(hash) => {
                    console.log(chalk.yellow(`Mint Game ZeroMission GameNFT on Bilinear`));
                    logger.log(`Mint Game ZeroMission GameNFT on Bilinear`);
                });
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const zonicTransferNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const balanceNFT = await getAmountToken(info.rpcLinea, info.zeroMission, address);
        if (balanceNFT == 0) {
            console.log(chalk.red('Balance zeroMission NFT == 0. Mint Game NFT'));
            logger.log('Balance zeroMission NFT == 0. Mint Game NFT');
            return;
        } else if (balanceNFT > 0) {
            await getTokenId(info.rpcLinea, info.zeroMission, address, 0).then(async(indexNFT) => {
                await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                    gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                    await dataSafeTransferZonic(info.rpcLinea, info.zeroMission, indexNFT, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.zeroMission, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Safe Transfer NFT Zonic`));
                        logger.log(`Safe Transfer NFT Zonic`);
                    });
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const bilinearBuyNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataBuyNftBilinear(info.rpcLinea, info.bilinearBuyableNFT, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.bilinearBuyableNFT, res.amountETH, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(hash) => {
                    console.log(chalk.yellow(`Successful Buy NFT on Bilinear`));
                    logger.log(`Successful Buy NFT on Bilinear`);
                });
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const nftsMeCreateCollection = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataCreateCollection2ME(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.nfts2me, null, res.encodeABI, privateKey, gasPrice, gasPrice).then(async(hash) => {
                    console.log(chalk.yellow(`Successful create Collection on NFTs2ME`));
                    logger.log(`Successful create Collection on NFTs2ME`);
                    await getCollectionAddress(info.rpcLinea, hash.transactionHash).then((addressColl) => {
                        updateJsonFile(address, addressColl, 'nfts2me.json');
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

export const nftsMeCreateEsitionCollection = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataCreateEditionCollection2ME(info.rpcLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.nfts2me, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Successful create Edition Collection on NFTs2ME`));
                logger.log(`Successful create Edition Collection on NFTs2ME`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const nftsMeChangeToPublic = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const addressColl = checkAddressInJson(address, 'nfts2me.json');
        if (!addressColl) {
            console.log(chalk.red(`Set Collection to Public View`));
            logger.log(`Set Collection to Public View`);
        } else {
            await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                await dataSetToPublic2ME(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, addressColl, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Successful set to Public NFTs2ME`));
                    logger.log(`Successful set to Public NFTs2ME`);
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostMintFreeNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const balanceNFT = await getAmountToken(info.rpcLinea, info.ghostJohnMC, address);
        if (balanceNFT == 0) {
            await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                await dataClaimFreeGhost(info.rpcLinea, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostFreeNFT, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Mint Free Ghost NFT`));
                    logger.log(`Mint Free Ghost NFT`);
                });
            });
        } else if (balanceNFT > 0) {
            console.log(chalk.red('NFT Already Mint'));
            logger.log('NFT Already Mint');
            return;
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostCollateralOwnNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const balanceNFT = await getAmountToken(info.rpcLinea, info.ghostJohnMC, address);
        if (balanceNFT == 0) {
            console.log(chalk.red('Balance Ghost NFT == 0. Claim Ghost Free'));
            logger.log('Balance Ghost NFT == 0. Claim Ghost Free');
            return;
        } else if (balanceNFT > 0) {
            await getTokenId(info.rpcLinea, info.ghostJohnMC, address, 0).then(async(indexNFT) => {
                const amountETH = 1 * 10**16;
                const amountDAI = 1 * 10**18;
                await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                    gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                    await dataCollateralGhost(info.rpcLinea, info.ghostJohnMC, indexNFT, amountETH, info.ETHLinea, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostJohnMC, amountETH, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Collateral Own NFT in ETH`));
                        logger.log(`Collateral Own NFT in ETH`);
                    });
                    await timeout(pauseTime);
                    await checkAllowance(info.rpcLinea, info.DAILinea, address, info.ghostJohnMC).then(async(allowance) => {
                        if (allowance < info.approveAmount) {
                            await dataApprove(info.rpcLinea, info.DAILinea, info.ghostJohnMC, info.approveAmount, address).then(async(res) => {
                                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.DAILinea, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                                console.log(chalk.yellow(`Approve DAI for Collateral Ghost`));
                                logger.log(`Approve DAI for Collateral Ghost`);
                            });
                        }
                        await timeout(pauseTime);
                        await dataCollateralGhost(info.rpcLinea, info.ghostJohnMC, indexNFT, amountDAI, info.DAILinea, address).then(async(res) => {
                            await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostJohnMC, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                            console.log(chalk.yellow(`Collateral Own NFT in DAI`));
                            logger.log(`Collateral Own NFT in DAI`);
                        });
                    });
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostUncollateralOwnNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const balanceNFT = await getAmountToken(info.rpcLinea, info.ghostJohnMC, address);
        if (balanceNFT == 0) {
            console.log(chalk.red('Balance Ghost NFT == 0. Claim Ghost Free'));
            logger.log('Balance Ghost NFT == 0. Claim Ghost Free');
            return;
        } else if (balanceNFT > 0) {
            await getTokenId(info.rpcLinea, info.ghostJohnMC, address, 0).then(async(indexNFT) => {
                const amountETH = 1 * 10**16;
                const amountDAI = 1 * 10**18;
                await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                    gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                    await dataUncollateralGhost(info.rpcLinea, info.ghostJohnMC, indexNFT, amountETH, info.ETHLinea, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostJohnMC, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Uncollateral (Redeem) Own NFT in ETH`));
                        logger.log(`Uncollateral (Redeem) Own NFT in ETH`);
                    });
                    await timeout(pauseTime);
                    await dataUncollateralGhost(info.rpcLinea, info.ghostJohnMC, indexNFT, amountDAI, info.DAILinea, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostJohnMC, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Uncollateral (Redeem) Own NFT in DAI`));
                        logger.log(`Uncollateral (Redeem) Own NFT in DAI`);
                    });
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostCreateCollection = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const addressColl = checkAddressInJson(address, 'nfts2me.json');
        if (!addressColl) {
            console.log(chalk.red(`Create Collection in NFTs2ME before Mint NFT`));
            logger.log(`Create Collection in NFTs2ME before Mint NFT`);
        } else {
            await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                await dataRegisterCollectionGhost(info.rpcLinea, addressColl, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostCollection, res.amountETH, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Register Collection in Ghost`));
                    logger.log(`Register Collection in Ghost`);
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostCollateralСollection = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const addressColl = checkAddressInJson(address, 'nfts2me.json');
        if (!addressColl) {
            console.log(chalk.red(`Create Collection in NFTs2ME before Colleteral`));
            logger.log(`Create Collection in NFTs2ME before Colleteral`);
        } else {
            const indexNFT = '2';
            const amountETH = 1 * 10**16;
            const amountDAI = 1 * 10**18;
            await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                await dataCollateralCollectionGhost(info.rpcLinea, addressColl, indexNFT, amountETH, info.ETHLinea, address).then(async(res) => {
                    await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostCollection, amountETH, res.encodeABI, privateKey, gasPrice, gasPrice);
                    console.log(chalk.yellow(`Collateral Collection in ETH`));
                    logger.log(`Collateral Collection in ETH`);
                });
                await timeout(pauseTime);
                await checkAllowance(info.rpcLinea, info.DAILinea, address, info.ghostCollection).then(async(allowance) => {
                    if (allowance < info.approveAmount) {
                        await dataApprove(info.rpcLinea, info.DAILinea, info.ghostCollection, info.approveAmount, address).then(async(res) => {
                            await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.DAILinea, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                            console.log(chalk.yellow(`Approve DAI for Collateral Ghost`));
                            logger.log(`Approve DAI for Collateral Ghost`);
                        });
                    }
                    await timeout(pauseTime);
                    await dataCollateralCollectionGhost(info.rpcLinea, addressColl, indexNFT, amountDAI, info.DAILinea, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostCollection, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Collateral Collection in DAI`));
                        logger.log(`Collateral Collection in DAI`);
                    });
                });
            });
        }
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const ghostUncollateralCollectionNFT = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const addressColl = checkAddressInJson(address, 'nfts2me.json');
        const indexNFT = '2';
        const amountETH = 1 * 10**16;
        const amountDAI = 1 * 10**18;
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await dataUncollateralCollectionGhost(info.rpcLinea, addressColl, indexNFT, amountETH, info.ETHLinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostCollection, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Uncollateral (Redeem) Collection in ETH`));
                logger.log(`Uncollateral (Redeem) Collection in ETH`);
            });
            await timeout(pauseTime);
            await dataUncollateralCollectionGhost(info.rpcLinea, addressColl, indexNFT, amountDAI, info.DAILinea, address).then(async(res) => {
                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.ghostCollection, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                console.log(chalk.yellow(`Uncollateral (Redeem) Collection in DAI`));
                logger.log(`Uncollateral (Redeem) Collection in DAI`);
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const hopSwaphETHInWETH = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await getAmountToken(info.rpcLinea, info.hETH, address).then(async(balance) => {
                if (balance == 0) {
                    console.log(chalk.red(`Balance hETH = 0`));
                    logger.log(`Balance hETH = 0`);
                } else {
                    await checkAllowance(info.rpcLinea, info.hETH, address, info.routerHop).then(async(allowance) => {
                        if (allowance < balance) {
                            await dataApprove(info.rpcLinea, info.hETH, info.routerHop, info.approveAmount, address).then(async(res) => {
                                await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.hETH, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                                console.log(chalk.yellow(`Approve hETH for router Hop`));
                                logger.log(`Approve hETH for router Hop`);
                            });
                        }
                    });
                    await dataSwaphETHToWETH(info.rpcLinea, balance, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.routerHop, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Swap ${balance/10**18}hETH -> WETH`));
                        logger.log(`Swap ${balance/10**18}hETH -> WETH`);
                    });
                }
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const hopUnwrapWETH = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await getGasPrice(info.rpcLinea).then(async(gasPrice) => {
            gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
            await getAmountToken(info.rpcLinea, info.WETH, address).then(async(balance) => {
                if (balance == 0) {
                    console.log(chalk.red(`Balance WETH = 0`));
                    logger.log(`Balance WETH = 0`);
                } else {
                    await dataUnwrapETH(info.rpcLinea, balance, address).then(async(res) => {
                        await sendEVMTX(info.rpcLinea, 2, res.estimateGas, info.WETH, null, res.encodeABI, privateKey, gasPrice, gasPrice);
                        console.log(chalk.yellow(`Unwrap ${balance/10**18}WETH -> ETH`));
                        logger.log(`Unwrap ${balance/10**18}WETH -> ETH`);
                    });
                }
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}

export const lineaBridgeETH = async(privateKey) => {
    const address = privateToAddress(privateKey);
    const random = generateRandomAmount(process.env.PERCENT_ETH_BRIDGE_MIN / 100, process.env.PERCENT_ETH_BRIDGE_MAX / 100, 3);

    try {
        await getETHAmount(info.rpcGoerli, address).then(async(amountETH) => {
            await getGasPrice(info.rpcGoerli).then(async(gasPrice) => {
                gasPrice = parseFloat((gasPrice * priority)).toFixed(4).toString();
                const amountFee = multiply(100000, gasPrice * 10**9);
                amountETH = parseInt(multiply(subtract(amountETH, amountFee), random));
                await dataBridgeETHToLinea(info.rpcGoerli, amountETH, address).then(async(res) => {
                    await sendEVMTX(info.rpcGoerli, 0, res.estimateGas, info.bridgeLinea, amountETH, res.encodeABI, privateKey, gasPrice);
                    console.log(chalk.yellow(`Bridge ${amountETH/10**18}ETH To Linea`));
                    logger.log(`Bridge ${amountETH/10**18}ETH To Linea`);
                });
            });
        });
    } catch (err) {
        logger.log(err);
        console.log(chalk.red(err.message));
        return;
    }
}