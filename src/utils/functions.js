import elliptic from 'elliptic';
import cryptoJS from 'crypto-js';
import { utils, Wallet } from 'ethers';
import { fromSeed } from 'bip32';
import { mnemonicToSeedSync } from 'bip39';
import Account from '../models/account';
// importing global root css
import BigNumber from 'bignumber.js';
// global
import { root } from '../configs/global';
const secp256k1 = new elliptic.ec('secp256k1');


export function isValidAddress(address) {
    const unprefixedAddress = address.replace(/^0x/, '');
    if (/^([A-Fa-f0-9]{40})$/.test(unprefixedAddress))
        return unprefixedAddress;
    else
        return false;
}
export function toHexString (value) {
    let hexString = value.toString(16);
    let padding = 64 - hexString.length;
    if(!padding) {
        return hexString;
    }
    padding = new Array(padding).fill('0');
    return `${padding.join('')}${hexString}`;
}

export function bytesToHexString(uintArray) {
    return uintArray.reduce((str, byte) => str + byte.toString(16).padStart(2,0), '');
}

function _hexStringToUint8Array(hexString) {
    return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

export const hexStringToUint8Array = _hexStringToUint8Array;

export function signTransaction(transaction, privKey) {
    transaction.transactionDataHash = cryptoJS.SHA256(JSON.stringify(transaction.getData())).toString();
    const keyPair = secp256k1.keyFromPrivate(privKey);
    const signature = keyPair.sign(transaction.transactionDataHash);
    return [signature.r.toString(16), signature.s.toString(16)];
}

function descompressPublicKey(pubKeyCompressed){
    return `${pubKeyCompressed.substr(64,65) === '0' ? '02' : '03'}${pubKeyCompressed.substr(0,64)}`
}

export function verifySignature(data, publicKey, signature) {
    const keyPair = secp256k1.keyFromPublic(descompressPublicKey(publicKey), 'hex');
    return keyPair.verify(data, {r: signature[0], s: signature[1]})
}

export function generateMnemonic() {

    return utils.HDNode.entropyToMnemonic(generateEntropy(16)); // cryptographyc secure seed
}

export function generateEntropy(length = 16) {
    return utils.randomBytes(length); // cryptographyc secure seed
}

export function encryptMnemonic(mnemonic, password = '') {
    return Wallet.fromMnemonic(mnemonic).encrypt(password);
}

export function decryptMnemonic(encryptJSON, password = '') {
    return Wallet.fromEncryptedJson(encryptJSON, password);
}

export function loadAccounts(mnemonic, count = 1) {
    const seed = mnemonicToSeedSync(mnemonic);
    const accounts = [];
    const rootKey = fromSeed(seed);
    for(let i = 0; i < count; i++) {
        accounts.push(Account(rootKey, i));
    }
    return accounts;
}

export default {
    toHexString,
    bytesToHexString,
    signTransaction,
    verifySignature,
    generateMnemonic,
    generateEntropy,
    encryptMnemonic,
    decryptMnemonic,
    loadAccounts,
    hexStringToUint8Array
}


export function catchError(err) {
    this.setState({error: err.message});
}

export const isMac = navigator.userAgent.indexOf("Mac") !== -1;

export function toFormat(value) {
    if(!value) {
        return new BigNumber(0).toFormat(0);
    }
    if(value.toFormat) {
        return value.toFormat(0);
    }
    return new BigNumber(value).toFormat(0);
}

export function saveSetState(state, callback) {
    if (this.active) {
        this.setState(state, callback);
    }
}
export function isTouch() {
    return 'ontouchstart' in window || 'ontouchstart' in document.documentElement;
}
export function generateKey(keyword = 'key', id = null) {
    const keyUniqueNumber = id || parseInt(Math.random() * Math.pow(10, 6) + Date.now());
    return keyword === false ? keyUniqueNumber : `${keyword}-${keyUniqueNumber}`;
}

export function getStyleValue(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
}

function getDecimals(decimalsString, maxDecimals = 1, defaultValue = null, defaultSeparetor = ',') {
    if(decimalsString) {
        return `${defaultSeparetor + decimalsString.substr(0, maxDecimals)}`;
    }
    return defaultValue ? defaultSeparetor + defaultValue : '';
}

export function shortFormatNumber(number, hideDecimals = true) {
    const newNumber = new BigNumber(number);
    if (number >= 100000 && number < 1000000) {
        number = newNumber.dividedBy(1000).toString().split('.');
        return `${number[0]}${getDecimals(number[1])} Mil`;
    }
    if (number < 1000000000 && number >= 1000000) {
        number = newNumber.dividedBy(1000000).toString().split('.');
        return `${toFormat(number[0] + getDecimals(number[1], 2, '00', '.'))} M`;
    }
    if (number < 1000000000000 && number >= 1000000000) {
        number = newNumber.dividedBy(1000000000).toString().split('.');
        return `${toFormat(number[0] + getDecimals(number[1], 2, '00', '.'))} Mil M`;
    }
    if (number >= 1000000000000) {
        number = newNumber.dividedBy(1000000000000).toString().split('.');
        return `${toFormat(number[0] + getDecimals(number[1], 2, '00', '.'))} B`;
    }
    return toFormat(number, hideDecimals ? 0 : 2);
}
export function pluckObjectArray(arrObj, key) {
    if (!arrObj || arrObj.length <= 0) {
        return [];
    }
    return arrObj.map(obj => obj[key]);
}
export function areArraysEqual(arr1, arr2) {
    if (!arr1 || !arr2 || arr1.length !== arr2.length)
        return false;
    return (!arr1.length && !arr2.length) || (arr1.length === arr1.filter(value => arr2.indexOf(value) !== -1).length);
}

export function mergeArrayObjects(arrObj1, arrObj2, key = 'id') {
    const newArray = [...arrObj1];
    arrObj2.forEach((data) => {
        if (newArray.findIndex(obj => obj[key] === data[key]) === -1) {
            newArray.push(data);
        }
    });
    return newArray;
}

/**
 * This method compare two array objects for the provided key to find the differences
 * @param {*} arrObj1
 * @param {*} arrObj2 
 * @param {*} key 
 * @return Array of Object with the diferents values between the two array 
 */
export function arrayObjectDiff(arrObj1, arrObj2, key) {
    const newArray = [];
    arrObj1.forEach((data) => {
        if (arrObj2.findIndex(obj => obj[key] === data[key]) === -1) {
            newArray.push(data);
        }
    });
    arrObj2.forEach((data) => {
        if (arrObj1.findIndex(obj => obj[key] === data[key]) === -1) {
            newArray.push(data);
        }
    });
    return newArray;
}

export function formatToNumber(number) {
    if (!number) return 0;
    return number.replace(/\./g, '').replace(',', '.');
}

export function withDecimalToNumber(value) {
    if (!value) return 0;
    return value.replace(/\./g, '').replace(',', '');
}

export function addValueOnAllObjects(arrObj, object) {
    return arrObj.map((obj) => ({...obj, ...object}))
}

export function arrayObjectToKeyData(arrObj, dataKey = 'id', arrayKeyName = 'ids') {
    const object = {};
    arrObj.forEach(obj => object[ obj[dataKey] ] = obj)
    return {
        [arrayKeyName]: pluckObjectArray(arrObj, dataKey),
        ...object,
    };
}

export function mergeUniqueArrayValues(arr1, arr2) {
    let arr = [];
    let arrayShort = [];
    if (arr1.length > arr2.length) {
        arr = [...arr1];
        arrayShort = [...arr2];
    } else {
        arr = [...arr2];
        arrayShort = [...arr1];
    }
    arrayShort.forEach(value => {
        if (arr.indexOf( value ) === -1) {
            arr.push(value);
        }
    });
    return arr;
}

export function objectsDiff(obj1, obj2) {
    const object = {};
    Object.keys(obj2).forEach((key) => {
        if (!obj2.hasOwnProperty(key)) {
            return;
        }
        if (obj1[key] !== obj2[key]) {
            object[key] = obj2[key];
        }
    });
    return object;
}

export function getValueOrDefault(object, key, defaultObject = null) {
    if (object && object[key]) {
        return object[key]
    }
    return defaultObject;
}

export function arrayObjectToObject(arr, key = 'id') {
    const object = {};
    arr.forEach(obj => {
        object[obj[key]] = obj;
    });
    return object;
}

export function objIsNotEmpty(obj) {
    try {
        return Object.keys(obj).length > 0;
    } catch (e) {
        return false;
    }
}

export function arrayUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export function setCssVariable(varName, value) {
    root.style.setProperty(varName, value);
}