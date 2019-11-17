'use strict'

const Web3 = require('web3')
const fs = require('fs')

require('dotenv').config({path: '.env'})

const NODE_URL = process.env.NODE_URL
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const CONTRACT_METHOD = process.env.CONTRACT_METHOD
const CONTRACT_ABI = JSON.parse(fs.readFileSync(process.env.CONTRACT_ABI_PATH, 'utf-8'))

// Web3 node connection using infura
var web3 = new Web3(new Web3.providers.HttpProvider(`${NODE_URL}`))

module.exports =
{
    sendData: (data='') => 
    {

        var contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

        const rawTx =
                            {
                                gasPrice: web3.utils.toHex(20000000000),
                                gasLimit: 3000000,
                                from: WALLET_ADDRESS,
                                to: contract.options.address,
                                data: contract.methods[CONTRACT_METHOD](data).encodeABI()
                            }
        
        return web3.eth.accounts.signTransaction(rawTx, '0x'+PRIVATE_KEY)
        .then( signedTx => {
            var sendSigned = web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            return Promise.race(
                [
                    sendSigned,
                    new Promise(    resolve  => sendSigned.once('transactionHash',    (tx) => resolve(tx) ) ),
                    new Promise( (_, reject) => sendSigned.once('error',           (...args) => reject(args)  ) )
                ])
        })
    }
}