# **Safle Custom Token Controller**

Safle Custom Token Controller SDK


## **Installation and Usage**

> Installation

Install the package by running the command,

`npm install @getsafle/custom-token-controller`

Import the package into your project using,

`const safleTokenController = require('@getsafle/custom-token-controller');`

## **Custom Token Controller**

> Initialising

Initialise the constructor using,

`const tokenController = new safleTokenController.CustomTokenController({userAddress, rpcURL, chain});`

* `userAddress` - User Public Address
* `rpcURL` - Web3 RPC provider URL
* `chain` - blockchain name

> Methods

Get Token Details

`const tokenDetails = await tokenController.getTokenDetails(contractAddress)`

* `contractAddress` - Token contract address

Get Token Balance

`const tokenDetails = await tokenController.getTokenBalance(contractAddress)`

* `contractAddress` - Token contract address
