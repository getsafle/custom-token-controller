const Web3 = require('web3');
const SINGLE_CALL_BALANCES_ABI = require('./constants/abi/single-call-balance-checker-abi');
const ERC20_TOKEN_CONTRACT_ABI = require('./constants/abi/erc-20-token-contract-abi')
const { SINGLE_CALL_BALANCES_ADDRESS } = require('./config');

class CustomTokenController {
    constructor({ rpcURL, userAddress }) {
        this.userAddress = userAddress,
            this.rpcURL = rpcURL;
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