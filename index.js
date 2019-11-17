'use strict'

const chain = require('./lib/chain')


chain.sendData('test2').then(
    tx => {
        console.log(tx)
    }
)