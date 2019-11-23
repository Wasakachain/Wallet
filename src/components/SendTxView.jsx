import React from 'react';
// css
import './css/SendTxView.css'
import UnlockWallet from './UnlockWallet';
import Wallet from '../models/wallet';
import SendTxFormContainer from '../containers/SendTxFormContainer';
import { renderSignedTxKey, renderSignedTx } from '../utils/sendTxFunctions';

class SendTxView extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onSendTxFormSubmit = this.onSendTxFormSubmit.bind(this);
        this.renderSignedTxKey = renderSignedTxKey.bind(this);
        this.renderSignedTx = renderSignedTx.bind(this);
        this.reset = this.reset.bind(this);
        this.catchError = this.catchError.bind(this);
    }

    state = {
        error: null,
        success: false,
        tx: false,
        loading: false
    }

    reset() {
        delete this.tx;
        this.setState({
            error: null,
            success: false,
            tx: false,
            loading: false
        });
    }

    catchError(e) {
        this.setState({ error: e.message,  loading: false  })
    }

    onSubmit() {
        const input = document.getElementById('wallet-password');
        if(input) {
            this.setState({ loading: true, error: null });
            this.unlockWallet(input.value).then(() => {
                this.setState({ sending: true });
                this.tx.send(this.url)
                .promise
                .then(() => {
                    this.setState({ 
                        loading: false,
                        signedTx: null,
                        error: null,
                        success: true,
                        sending: false,
                    });
                })
                .catch(e => {
                    this.setState({
                        sending: false,
                        loading: false,
                        error: e && typeof e.message === 'string' ? e.message : 'Unexpected error' 
                    });
                })
            }).catch(this.catchError);
        }
    }

    unlockWallet(password) {
        return new Promise((res, rej) => {
            let json;
            try {
                json = JSON.parse(localStorage['encryptedWallet']);
            } catch(e) {
                localStorage.removeItem('encryptedWallet');
                return rej({ error: { message: 'Invalid JSON.' }})
            }
            Wallet.fromEncryptedJSON(json, password)
            .then(res)
            .catch(rej)
        }) 
    }

    onSendTxFormSubmit(tx, url) {
        this.tx = tx;
        this.url = url;
        this.setState({ sucess: false, tx: true });
    }

    renderUnlock() {
        const { error, loading, sending } = this.state;
        return (
            <div className="unlock-account-positioner">
                <div className="unlock-account-wrapper">
                    <h3>{sending ? 'Sending Tx...' : 'Unlock account'}</h3>
                    {typeof error === 'string' && (
                        <p className="error-input">{error}</p>
                    )}
                    {!loading && (
                        <React.Fragment>
                            {this.renderSignedTx({
                                ...this.tx.getData(),
                                transactionDataHash: this.tx.transactionDataHash,
                                senderSignature: this.tx.senderSignature,
                            })}
                            <div className="sign-transaction-submit flex-center">
                                <button
                                    className="unlogged-option"
                                    type="button"
                                    onClick={this.reset}
            
                                >
                                    Cancel
                                </button>
                            </div>
                        </React.Fragment>
                    )}
                    <UnlockWallet
                        hideTitle="true"
                        onContinue={this.onSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        )
    }

    renderSuccesMessage() {
        return (
            <div className="send-tx-form-wrapper success-message">
                <p>Transaction sent successfully!</p>
                <p>
                    Transaction hash:
                </p>
                <a
                    href={`http://localhost:9999/transaction/${this.tx.transactionDataHash}`}
                    target="_blank"
                >
                    0x{this.tx.transactionDataHash}
                </a>
                <div className="sign-transaction-submit flex-center">
                    <button
                        className="node-url-submit unlogged-option"
                        type="button"
                        onClick={this.reset}

                    >
                        Send Another Transaction
                    </button>
                </div>
            </div>
        )
    }

    render() {
        const { success, tx } = this.state;
        return (
            <main className={`send-tx-main${tx && !success ? ' locked-account' : ''}`}>
                <h2>Send Transaction</h2>
                {!tx ? (
                    <SendTxFormContainer onSubmit={this.onSendTxFormSubmit} />
                ) : (
                    success ? (
                        this.renderSuccesMessage()
                    ) : (
                        this.renderUnlock()
                    )
                )}
            </main>
        )
    }
}

export default SendTxView;