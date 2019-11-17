'use strict'

const chain = require('./lib/chain')


chain.sendData('string to write in chain').then(
    tx => {
        console.log(tx)
        console.log('Check your transaction from: https://rinkeby.etherscan.io/tx/'+tx)
    }
)