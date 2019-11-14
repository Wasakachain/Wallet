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
    transaction.transactionDataHash = cryptoJS.SHA256(JSON.stringify(transaction)).toString();
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