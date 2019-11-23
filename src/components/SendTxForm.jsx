import React from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { isValidAddress } from '../utils/functions';
import { WASA } from '../configs/global';
import Transaction from '../models/transaction';
import SendTxFormInput from './SendTxFormInput';
import Loader from './Loader';
import { renderSignedTxKey, renderSignedTx } from '../utils/sendTxFunctions';
// css
import './css/SendTxForm.css'
// data
import inputProps from '../static_data/sendTxFormInputsProps';


class SendTxForm extends React.Component {

    constructor(props) {
        super();
        this.signTransaction = this.signTransaction.bind(this);
        this.sendTransaction = this.sendTransaction.bind(this);
        this.catchError = this.catchError.bind(this);
        this.renderSignedTxKey = renderSignedTxKey.bind(this);
        this.renderSignedTx = renderSignedTx.bind(this);
        this.onChange = this.onChange.bind(this);
        this.inputs = inputProps.call(this, props.addresses);
        this.from = props.addresses[0];
    }

    state = {
        signedTx: null,
        error: null,
        loading: false
    }

    catchError(e) {
        this.setState({ error: e.message,  loading: false  })
    }

    signTransaction(e) {
        e.preventDefault();
        if(this.state.loading) return null;
        const to = isValidAddress(this.to);
        if(!to) {
            delete this.tx;
            this.setState({errorTx: 'Invalid "recipient" address.', signedTx: null});
            return;
        }
        if(to === this.from) {
            delete this.tx;
            this.setState({errorTx: 'The "sender" and "recipient" addresses can\'t be the same.', signedTx: null});
            return;
        }
        if(new BigNumber(this.value).isNaN()) {
            delete this.tx;
            this.setState({errorTx: 'Invalid value.', signedTx: null});
            return;
        }
        this.tx = new Transaction(
            this.from,
            to,
            new BigNumber(this.value).multipliedBy(WASA).toString(),
            '10',
            this.props.publicKeys[this.from],
            undefined
        );
        this.tx.sign(this.props.privateKeys[this.from]);
        this.setState({
            errorTx: null, 
            signedTx: {
                from: this.tx.from,
                to: this.tx.to,
                value: this.tx.value,
                fee: this.tx.fee,
                dateCreated: this.tx.dateCreated,
                data: this.tx.data,
                senderPubKey: this.tx.senderPubKey,
                senderSignature: this.tx.senderSignature,
                transactionDataHash: this.tx.transactionDataHash,
            }
        });
    }

    sendTransaction(e) {
        e.preventDefault();
        if(!this.tx.verify() || !this.tx) {
            delete this.tx;
            this.setState({ errorTx: 'Tx verification failed. Please retry.', signedTx: null});
            return;            
        }

        this.url = /^https?:\/\//.test(this.url) ? this.url : 'http://' + this.url;
        this.props.onSubmit(this.tx, this.url);
    }

    onChange({name, value}) {
        this[name] = value;
    }

    renderNodeUrlForm() {
        const { signedTx, errorTx, loading } = this.state;
        return (
            <React.Fragment>
                {this.renderSignedTx(signedTx)}
                <form
                    id="send-transaction-form"
                    onSubmit={this.sendTransaction}
                >
                    <SendTxFormInput
                        key="node-url-input"
                        label="Node URL"
                        onChange={this.onChange}
                        inputProps={{
                            id: 'node-url-input',
                            name: 'url',
                            disabled: loading
                        }}
                    />
                    {errorTx && (
                        <div className="flex-center">
                            <p className="error-input">{errorTx}</p>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="sign-transaction-submit flex-center">
                            <button
                                className="node-url-submit unlogged-option"
                                type="submit"
                            >
                                Send Transaction
                            </button>
                        </div>
                    )}
                </form>
            </React.Fragment>
        )
    }


    render() {
        const { signedTx, errorTx, loading, success } = this.state;
        return (
            <div className="send-tx-form">
                {success ? (
                    this.renderSuccesMessage() 
                ) : (
                    <div className="send-tx-form-wrapper">
                        <form
                            id="sign-transaction-form"
                            className="sign-transaction-form"
                            onSubmit={this.signTransaction}
                        >
                            {this.inputs.map(input => {
                                input.inputProps.disabled = loading;
                                return (
                                    <SendTxFormInput
                                        key={input.inputProps.id}
                                        onChange={this.onChange}
                                        {...input}
                                    />   
                                )
                            })}
                            {errorTx && !signedTx && (
                                <div className="flex-center">
                                    <p className="error-input">{errorTx}</p>
                                </div>
                            )}
                            <div className="sign-transaction-submit flex-center">
                                <button
                                    className="node-url-submit unlogged-option"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Sign Transaction
                                </button>
                            </div>
                        </form>
                        {signedTx && this.renderNodeUrlForm()}
                    </div>
                )}
            </div>
        )
    }
}

export default SendTxForm;