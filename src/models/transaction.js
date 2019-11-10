const utils = require('../utils/functions');

class Transaction {
    constructor(sender, to, value, fee, data, senderPubKey) {
        this.from = sender;
        this.to = to;
        this.value = value;
        this.fee = fee;
        this.dateCreated = new Date().toISOString();
        this.data = data;
        this.senderPubKey = senderPubKey;
    }

    sign(privateKey) {
        this.senderSignature = utils.signTransaction(this, privateKey);
    }

    verify() {
        return utils.verifySignature(this.transactionHash, this.senderPubKey, this.senderSignature);
    }
}

module.exports = Transaction;