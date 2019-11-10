const Wallet = require('./src/models/wallet')

const mnemonic = "garage brand trophy shadow river pioneer cushion boil addict brush master vehicle";

let wallet = new Wallet(mnemonic);

wallet.encrypt().then(json => {
    Wallet.fromEncryptedJSON(json).then(wallet => console.log(wallet.getAccounts()));
});
