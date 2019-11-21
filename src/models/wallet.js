import {validateMnemonic} from 'bip39';
import {
    loadAccounts, generateMnemonic,
    decryptMnemonic, encryptMnemonic
} from '../utils/functions';
import Ajax from '../utils/ajax';



function _fromEncryptedJSON(JSON, password) {
    return decryptMnemonic(JSON, password).then(wallet => new Wallet(wallet.mnemonic));
}

function _createRandom() {
    return new Wallet(generateMnemonic());
}

function Wallet(mnemonic) {
    if(!mnemonic) {
        throw 'mnemonic required.';
    }
    if(mnemonic && !validateMnemonic(mnemonic)) {
        throw 'Invalid mnemonic.';
    }
    let _mnemonic = mnemonic;

    class SingleWallet {
        constructor() {
            this.accounts = loadAccounts(_mnemonic, 5);
        }

        get mnemonic() {
            return _mnemonic;
        }

        getAccounts() {
            return this.accounts.map(account => account.getData());
        }

        getBalances(providerUrl) {
            const ajax = new Ajax(providerUrl+'/addresses/balance', {
                method: 'post',
                body: {
                    addresses: this.accounts.map(account => account.address)
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return {
                promise: ajax.result(),
                abort: ajax.abort
            }
        }

        encrypt(password) {
            return encryptMnemonic(this.mnemonic, password)
        }
    }

    return new SingleWallet();
}


Wallet.fromEncryptedJSON = _fromEncryptedJSON;

Wallet.createRandom = _createRandom;

export default Wallet;