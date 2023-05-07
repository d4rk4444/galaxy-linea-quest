import { info } from './other.js';
import { request, gql, GraphQLClient } from 'graphql-request';

export const verifyCred = async (credId, address) => {
    const graphQLClient = new GraphQLClient('https://graphigo.prd.galaxy.eco/query');
    const query = gql`
        mutation {
            verifyCredential(input:{
                credId: ${credId}
                address: "${address}"
            })
        }
    `;
    try {
        await graphQLClient.request(query);
        return true;
    } catch (err) {
        return false;
    } 
}

export const claimPoints = async (campaignID, address) => {
    const graphQLClient = new GraphQLClient('https://graphigo.prd.galaxy.eco/query');
    const query = gql`
        mutation {
            prepareParticipate(input: {
                signature: ""
                campaignID: "${campaignID}"
                address: "${address}"
                }) {
                allow
                disallowReason
                mintFuncInfo {
                    verifyIDs
                    nftCoreAddress
                }
            }
        }
    `;
    try {
        await graphQLClient.request(query);
        return true;
    } catch (err) {
        return false;
    }
}

export const balancePoints = async (address) => {
    const graphQLClient = new GraphQLClient('https://graphigo.prd.galaxy.eco/query');
    const query = gql`
        query {
            campaign(id: "GCd1YUZyrN") {
                numberID
                name
                numNFTMinted
                startTime
                endTime
                claimedTimes(address: "${address}")
                claimedLoyaltyPoints (address: "${address}")
            }
        }
    `;

    const result = await graphQLClient.request(query);
    return result.campaign.claimedLoyaltyPoints;
}