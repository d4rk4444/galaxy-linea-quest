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