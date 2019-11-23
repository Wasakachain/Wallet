import utils from '../utils/functions';
import Ajax from '../utils/ajax';

class Transaction {
    constructor(sender, to, value, fee, senderPubKey, data) {
        this.from = sender;
        this.to = to;
        this.value = value;
        this.fee = fee;
        this.senderPubKey = senderPubKey;
        this.dateCreated = new Date().toISOString();
        this.data = data;
    }

    sign(privateKey) {
        this.senderSignature = utils.signTransaction(this, privateKey);
    }

    verify() {
        return utils.verifySignature(this.transactionDataHash, this.senderPubKey, this.senderSignature);
    }

    getData() {
        return {
            from: this.from,
            to: this.to,
            value: this.value,
            fee: this.fee,
            dateCreated: this.dateCreated,
            data: this.data,
            senderPubKey: this.senderPubKey,
        }
    }

    send(providerUrl) {
        const ajax = new Ajax(providerUrl.replace(/\/$/, '')+'/transactions/send', {
            method: 'post',
            body: this,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return {
            promise: ajax.result(),
            abort: ajax.abort
        }
    } 
}

export default Transaction;