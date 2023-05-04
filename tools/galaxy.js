import { request, gql, GraphQLClient } from 'graphql-request';

export const callClaimOAT = async (campaignID, address) => {
    const graphQLClient = new GraphQLClient('https://graphigo.prd.galaxy.eco/query');
    const query = gql`
        mutation claim {
            prepareParticipate(input: {
            signature:  ""
            campaignID: "${campaignID}"
            address:    "${address}"
            }) {
                allow              # Is allow user claim nft
                disallowReason     # Disallow reason
            }
        }
    `;
    const result = await graphQLClient.request(query);

    return result;
}