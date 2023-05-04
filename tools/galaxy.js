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
    const result = await graphQLClient.request(query);

    return result;
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
    const result = await graphQLClient.request(query);

    return result;
}