# Custom Token Controller

This SDK can be used to get the details of any token by it's contract address and it's balance for a specific address.

## Installation

To install this SDK,

```sh
npm install --save @getsafle/custom-token-controller
```

## Initialization

Initialize the constructor,

```js
const safleTokenController = require('@getsafle/custom-token-controller');

const tokenController = new safleTokenController.CustomTokenController({ userAddress, rpcURL, chain });
```

* `userAddress` - User Public Address
* `rpcURL` - Web3 RPC provider URL
* `chain` - blockchain name

<br>

> Get Token Details

<br>

This function returns the token decimal and symbol for the contract address passed as parameter.

```js
const tokenDetails = await tokenController.getTokenDetails(contractAddress);
```

* `contractAddress` - Token contract address

<br>

> Get Token Balance

<br>

```js
const tokenDetails = await tokenController.getTokenBalance(contractAddress);
```

* `contractAddress` - Token contract address
