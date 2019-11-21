import React from 'react';
//css
import './css/CreateWallet.css'
import './css/UnloggedOptions.css'
import { generateMnemonic } from '../utils/functions';
import UnlockWalletContainer from '../containers/UnlockWalletContainer';


class CreateWallet extends React.Component {

    constructor() {
        super();
        this.generate = this.generate.bind(this);
        this.continue = this.continue.bind(this);
    }

    state = {
        // mnemonic: 'burden royal photo direct vague topple dice injury very also monkey absurd',
        mnemonic: null,
    }

    componentDidMount() {
        // this.unblock = this.props.history.block(function() { return 'Are you sure you want to leave the page?' })
    }

    componentWillUnmount() {
        if(typeof this.unblock === 'function') {
            this.unblock();
        }
    }

    generate() {
        this.unblock = this.props.history.block(function() { return 'Are you sure you want to leave the page?' })
        this.setState({mnemonic: generateMnemonic() });
    }

    continue() {
        const input = document.getElementById('wallet-password');
        if(input) {
            this.props.setLoading(true);
            this.props.encryptWallet(this.state.mnemonic, input.value).then(() => {
                this.props.history.replace('/');
            });
            this.unblock();
        }
    }

    renderCreate() {
        return(
            <React.Fragment>
                <div className="create-wallet-button-wrapper flex-center">
                    <button
                        className="unlogged-option"
                        type="button"
                        onClick={this.generate}
                    >
                        Generate New Mnemonic
                    </button>
                </div>
            </React.Fragment>
        )
    }

    renderGenerated() {
        const { mnemonic } = this.state;
        return (
            <React.Fragment>
                <p className="create-wallet-warning create-wallet-mnemonic-title">Your Mnemonic</p>
                <p className="create-wallet-mnemonic">
                    {mnemonic}
                </p>
                <p className="create-wallet-warning create-wallet-wasa-warning">Protect your WASAS!</p>
                <UnlockWalletContainer 
                    onContinue={this.continue}
                    hideTitle={true}
                />
            </React.Fragment>
        )
    }

    render() {
        const { mnemonic } = this.state;
        return (
            <div className="create-wallet">
                <h2>Create Wallet</h2>
                <p className="create-wallet-warning main-warning">
                    Remember than once a mnemonic is generated <span className="create-wallet-strong-warning">it can't be recovered</span>, so make sure to save it in a secure place where you won't lose it.
                </p>
                {mnemonic ? (
                    this.renderGenerated()
                ) : (
                    this.renderCreate()
                )}
            </div>
        )
    }
}

export default CreateWallet;