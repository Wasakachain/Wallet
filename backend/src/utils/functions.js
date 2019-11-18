const http = require('http');
const https = require('https');
const Url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');

function setHeaders(data) {
    let header = {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
    }
    if (data) {
        header['Content-Length'] = Buffer.byteLength(querystring.stringify(data));
    }
    return header;
}

exports.request = (url, method, data) => {
    return new Promise((resolve, reject) => {
        let parsedUrl = Url.parse(url);
        const handler = parsedUrl.port == 443 ? https : http;

        let output = '';
        const req = handler.request({
            host: `${parsedUrl.hostname}`, port: parsedUrl.port, path: parsedUrl.path, method, headers: setHeaders(data)
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                output += chunk;
            });

            res.on('end', () => {
                let response = JSON.parse(output);
                if (res.statusCode >= 300) {
                    reject({ status: res.statusCode, data: response });
                    return;
                }
                resolve({ status: res.statusCode, data: response });
            });
        });

        req.on('error', (err) => {
            reject({ error: err });
        });

        if (data) {
            req.write(querystring.stringify(data));
        }

        req.end();
    })
}
const elliptic = require('elliptic');
const cryptoJS = require('crypto-js');
const secp256k1 = new elliptic.ec('secp256k1');
const ethers = require('ethers');
const bip32 = require('bip32');
const bip39 = require('bip39');
const Account = require('../models/account');

exports.toHexString = function (value) {
    let hexString = value.toString(16);
    let padding = 64 - hexString.length;
    if(!padding) {
        return hexString;
    }
    padding = new Array(padding).fill('0');
    return `${padding.join('')}${hexString}`;
}

exports.bytesToHexString = function(uintArray) {
    return uintArray.reduce((str, byte) => str + byte.toString(16).padStart(2,0), '');
}

function _hexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

exports.hexStringToUint8Array = _hexStringToUint8Array;

exports.signTransaction = function (transaction, privKey) {
    transaction.transactionDataHash = crypto.createHash('sha256').update(JSON.stringify(transaction.getData())).digest('hex');
    const keyPair = secp256k1.keyFromPrivate(privKey.replace('0x',''));
    const signature = keyPair.sign(transaction.transactionDataHash);
    return [signature.r.toString(16), signature.s.toString(16)];
}

function descompressPublicKey(pubKeyCompressed){
    return `${pubKeyCompressed.substr(64,65) === '0' ? '02' : '03'}${pubKeyCompressed.substr(2,64)}`
}

exports.verifySignature = function (data, publicKey, signature) {
    const keyPair = secp256k1.keyFromPublic(descompressPublicKey(publicKey), 'hex');
    return keyPair.verify(data, {r: signature[0], s: signature[1]})
}

exports.generateMnemonic = function() {
    return ethers.utils.HDNode.entropyToMnemonic(generateEntropy(16)); // cryptographyc secure seed
}

exports.generateEntropy = function(length = 16) {
    return ethers.utils.randomBytes(length); // cryptographyc secure seed
}

exports.encryptMnemonic = function(mnemonic, password = '') {
    return ethers.Wallet.fromMnemonic(mnemonic).encrypt(password);
}

exports.decryptMnemonic = function(encryptJSON, password = '') {
    return ethers.Wallet.fromEncryptedJson(encryptJSON, password);
}

exports.loadAccounts = function(mnemonic, count = 1) {
    seed = bip39.mnemonicToSeedSync(mnemonic);
    const accounts = [];
    const rootKey = bip32.fromSeed(seed);
    for(let i = 0; i < count; i++) {
        accounts.push(new Account(rootKey, i));
    }
    return accounts;
}