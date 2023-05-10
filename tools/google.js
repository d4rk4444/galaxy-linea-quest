import axios from 'axios-https-proxy-fix';
import { HttpsProxyAgent } from 'https-proxy-agent';
import qs from 'querystring';

export const testProxy = async(proxy) => {
    try {
        const url = 'http://ip-api.com/json';
        const httpAgent = new HttpsProxyAgent(`https://${proxy}`);
        const response = await axios.get(url, {
            httpsAgent: httpAgent,
        });
        if (response.data.status == 'success') {
            const country = response.data.country;
            const city = response.data.city;
            return { country, city };
        }
    } catch (err) {
        return false;
    }
}

export const sendForm = async(proxy, wallet, emodji) => {
    const formId = '1FAIpQLScJ23edXaRScx2NDJtU_6-8EytWOa_3IoKFMY1RajAQT2Hj-A';
    const formData = {
        'entry.398666686': wallet,
        'entry.1613611154': emodji,
    };
    const httpAgent = new HttpsProxyAgent(`http://${proxy}`);

    const response = await axios.post(`https://docs.google.com/forms/d/e/${formId}/formResponse`, qs.stringify(formData), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpAgent: httpAgent
    })
    return response.status;
}