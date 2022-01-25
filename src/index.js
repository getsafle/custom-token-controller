const Web3 = require('web3');
const SINGLE_CALL_BALANCES_ABI = require('./constants/abi/single-call-balance-checker-abi');
const ERC20_TOKEN_CONTRACT_ABI = require('./constants/abi/erc-20-token-contract-abi')
const helper = require('./utils/helper');

class CustomTokenController {
    constructor({ rpcURL, userAddress, chain }) {
        this.userAddress = userAddress,
        this.rpcURL = rpcURL;
        this.chain = chain;
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcURL));
    }

    async getTokenDetails(contractAddress) {

        const ethContract = new this.web3.eth.Contract(ERC20_TOKEN_CONTRACT_ABI, contractAddress);
        try {
            const decimal = await ethContract.methods.decimals().call();
            const symbol = await ethContract.methods.symbol().call();

            return { decimal, symbol };
        } catch (error) {
            return { error };
        }
    }

    async getTokenBalance(contractAddress) {
        const { SINGLE_CALL_BALANCES_ADDRESS } = await helper.getcontractAddress(this.chain);
        const ethContract = new this.web3.eth.Contract(SINGLE_CALL_BALANCES_ABI, SINGLE_CALL_BALANCES_ADDRESS);
        try {
            const balance = await ethContract.methods.balances([this.userAddress], [contractAddress]).call();
            return balance;
        } catch (error) {
            return { error };
        }
    }
}

module.exports = { CustomTokenController: CustomTokenController }