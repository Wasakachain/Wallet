import React from 'react';
//css
import './css/UnlockWallet.css'
import Loader from './Loader';
import PasswordFieldset from './PasswordFieldset';
import { catchError } from '../utils/functions';

class UnlockWallet extends React.Component {

    constructor(props) {
        super();
        this.continue = props.onContinue || this.continue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.catchError = catchError.bind(this);
    }

    state = {
        error: null,
    }

    continue() {
        if(this.state.error) {
            this.setState({error: null});
        }
        const input = document.getElementById('wallet-password');
        if(input) {
            this.props.decryptWallet(input.value).then(() => {
                this.props.history.replace('/');
            }).catch(this.catchError);
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.continue();
    }

    render() {
        const { hideTitle, loading } = this.props;
        const { error } = this.state;
        return (
            <div>
                {!hideTitle && (
                    <h2>Unlock Your Wallet</h2>
                )}
                {error && (
                    <p className="error-input">{error}</p>
                )}
                {loading ? (
                    <div className="flex-center loading-wallet">
                        <Loader className=" third-color"/>
                    </div>
                ) : (
                    <form onSubmit={this.onSubmit}>
                        <PasswordFieldset />
                        <div className="create-wallet-button-wrapper flex-center">
                            <button
                                className="unlogged-option"
                                type="submit"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}

export default UnlockWallet;