const config = require('../config');
const axios = require('axios');
const { INVALID_CHAIN_SELECTED } = require('../constants/responses');

const getcontractAddress = async (chain) => {
    const { response } = await getRequest({ url: config.CONTRACT_DATA_URL });

    const { supportedChains, chains } = response;

    if (!supportedChains.includes(chain)) {
        return { error: INVALID_CHAIN_SELECTED };
    }
    else {
        return {  SINGLE_CALL_BALANCES_ADDRESS: chains[chain].SINGLE_CALL_BALANCES_ADDRESS };
    }
}

const getRequest = async ({ url }) => {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'GET',
        });
        return { response: response.data };
    } catch (error) {
        return { error: [{ name: 'server', message: 'There is some issue, Please try after some time' }] };
    }
};
module.exports = { getcontractAddress };