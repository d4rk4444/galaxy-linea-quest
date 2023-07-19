import { verifyCred, claimPoints, balancePoints } from "../tools/galaxy.js";
import { info, log, privateToAddress } from "../tools/other.js";


export const galaxyVerifyCred = async(credArray, privateKey) => {
    const address = privateToAddress(privateKey);

    for (let i = 0; i < credArray.length; i++) {
        try {
            await verifyCred(info['GalaxyCred' + credArray[i]], address).then((res) => {
                if (res) {
                    log('log', 'green', `Verify ${credArray[i]} Successful`);
                } else if (!res) {
                    log('log', 'gray', `${credArray[i]} Not ready yet`);
                }
            });
        } catch (err) {
            log('error', 'red', err.message);
            return;
        }
    }
}

export const galaxyClaimPoints = async(campaignID, privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await claimPoints(campaignID, address).then((res) => {
            if (res) {
                log('log', 'green', `Claim Successful`);
            } else if (!res) {
                log('log', 'gray', `Error Claim`);
            }
        });
    } catch (err) {
        log('error', 'red', err.message);
        return;
    }
}

export const checkBalancePoints = async(campaignID, privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        await balancePoints(campaignID, address).then((res) => {
            log('log', 'magentaBright', `${res} points`);
        });
    } catch (err) {
        log('error', 'red', err.message);
        return;
    }
}

export const checkBalanceAllWeeksPoints = async(privateKey) => {
    const address = privateToAddress(privateKey);

    try {
        const arrCamp = ['GCd1YUZyrN', 'GCPRsUEZhR', 'GCEMnUEySZ', 'GC9kPUX6pP', 'GC8ofUNp65', 'GCcr5UNjtY', 'GCw91UQDkQ', 'GCfkeUSkbD', 'GCvpxUetXY', 'GCKurUN4yC'];
        let amountPoints = 0;
        for (let i = 0; i < arrCamp.length; i++) {
            amountPoints = amountPoints + Number(await balancePoints(arrCamp[i], address));
        }
        const tier = amountPoints <= 2500 ? 5
            : amountPoints > 2500 && amountPoints < 2740 ? 4
            : amountPoints >= 2740 && amountPoints < 3050 ? 3
            : amountPoints >= 3050 && amountPoints < 3400 ? 2
            : 1;
        log('log', 'yellow', `Balance Points: ${amountPoints}  Tier: ${tier}`);
        return { balancePoints, tier };
    } catch (err) {
        log('error', 'red', err.message);
        return;
    }
}