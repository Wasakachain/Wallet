import React from 'react';
import { validateMnemonic } from 'bip39';
import MnemonicWordInput from './MnemonicWordInput';
import PasswordFieldset from './PasswordFieldset';
import Loader from './Loader';
import { catchError } from '../utils/functions';


class RestoreFromMnemonic extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.catchError = catchError.bind(this);
        // this.words = 'burden royal photo direct vague topple dice injury very also monkey absurd'.split(' ');
        // this.wordsErrors = new Array(12).fill(false);
        this.words = new Array(12).fill(false);
        this.wordsErrors = new Array(12).fill(true);
    }

    state = {
        showError: false,
    }

    onChange(index, word, error) {
        this.words[index] = word;
        this.wordsErrors[index] = error;
    }

    onSubmit(e) {
        e.preventDefault();
        for(let i = 0; i < this.words.length; i++) {
            if(this.wordsErrors[i]) {
                document.getElementById(`mnemonic-word-${i}`).focus();
                if(!this.state.showError) {
                    this.setState({showError: true});
                }
                return;
            }
        }
        const mnemonic = this.words.join(' ');
        if(!validateMnemonic(mnemonic)) {
            this.setState({ error: 'Invalid mnemonic.'})
            return;
        }
        const input = document.getElementById('wallet-password');
        if(input) {
            this.props.setLoading(true);
            this.props.encryptWallet(mnemonic, input.value).then(() => {
                this.props.history.replace('/');
            }).catch(catchError);
        }
    }

    renderInput(element, index) {
        return (
            <MnemonicWordInput 
                key={`mnemonic-word-${index}`} 
                index={index}
                word={this.words[index]}
                onChange={this.onChange}
                showError={this.state.showError}
            />
        )
    }

    renderForm() {
        const { error } = this.state;
        return (
            <React.Fragment>
                <h3>Insert your seed phrase</h3>
                <form onSubmit={this.onSubmit} className="mnemonic-form flex-center">
                    <div className="mnemonic-form-inputs">
                        {this.words.map(this.renderInput)}
                    </div>
                    <PasswordFieldset />
                    {error && (
                        <p className="error-input">{error}</p>
                    )}
                    <div className="mnemonic-form-submit-wrapper flex-center">
                        <button
                            className="unlogged-option"
                            type="submit"
                        >
                            Restore
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }

    render() {
        const { loading } = this.props;
        return (
            <div className="restore-from-mnemonic">
                {loading ? (
                    <div className="restore-from-mnemonic-loader flex-center">
                        <Loader className="third-color"/>
                    </div>
                ) : (
                    this.renderForm()
                )}
            </div>
        )
    }
}

export default RestoreFromMnemonic;