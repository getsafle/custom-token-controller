const config = require('../config');
const axios = require('axios');
const { INVALID_CHAIN_SELECTED } = require('../constants/responses');

const getcontractAddress = async (chain) => {
    let output;

    const { response, error } = await requestWithTimeout({ url: config.CONTRACT_DATA_URL });
    if (error) {
        const { response } = await requestWithTimeout({ url: config.FALLBACK_CONTRACT_DATA_URL });
        output = response;
    } else {
        output = response;
    }

    const { supportedChains, chains } = output;

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

function timeoutAfter(seconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ error: [{ name: 'server', message: 'There is some issue, Please try after some time' }] })
      }, seconds * 1000);
    });
  }

async function requestWithTimeout({url}) {
    try {
      const response = await Promise.race(
        [timeoutAfter(3), getRequest({ url })]
      );
        return response;
    } catch (error) {
      return { error: [{ name: 'server', message: 'There is some issue, Please try after some time' }] };
    }
}
module.exports = { getcontractAddress };