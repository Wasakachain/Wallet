const Wallet = require('./src/models/wallet')

const mnemonic = "garage brand trophy shadow river pioneer cushion boil addict brush master vehicle";

let wallet = new Wallet(mnemonic);

const transaction = wallet.accounts[0].signTransaction(wallet.accounts[1].address, 100, 100.1);
transaction.send('http://localhost:5555').then(console.log).catch(console.log)
