import React from 'react';
import RestoreFromMnemonicContainer from '../containers/RestoreFromMnemonicContainer';
import RestoreFromJsonContainer from '../containers/RestoreFromJsonContainer';
//css
import './css/RestoreWallet.css'

class RestoreWallet extends React.Component {
    
    constructor() {
        super();
        this.pickOption = this.pickOption.bind(this);
    }

    state = {
        picked: 'mnemonic',
    }

    pickOption({target}) {
        this.setState({ picked: target.dataset.option });
    }

    renderOptionContent() {
        switch(this.state.picked) {
            case 'mnemonic':
                return <RestoreFromMnemonicContainer history={this.props.history} />
            case 'json':
                return <RestoreFromJsonContainer history={this.props.history} />
            default: 
                return <p className="restore-wallet-message pick-option">Pick your prefered option</p>
        }
    }

    render() {
        const { picked } = this.state;
        return (
            <div className="restore-wallet">
                <h2>Restore Your Wallet</h2>
                {
                    // <p className="restore-wallet-message">You can restore your wallet from:</p>
                    // <div className="restore-wallet-options flex-center">
                    //     <div className="unlogged-option-wrapper" >
                    //         <button
                    //             className={`unlogged-option${picked !== 'mnemonic' ? ' option-disabled' : ''}`}
                    //             type="button"
                    //             onClick={this.pickOption}
                    //             data-option='mnemonic'
                    //         >
                    //             Mnemonic
                    //         </button>
                    //     </div>
                    //     <div className="unlogged-option-wrapper" >
                    //         <button
                    //             className={`unlogged-option${picked !== 'json' ? ' option-disabled' : ''}`}
                    //             type="button"
                    //             onClick={this.pickOption}
                    //             data-option='json'
                    //         >
                    //             Keystore File
                    //         </button>
                    //     </div>
                    // </div>
                }
                {this.renderOptionContent()}
            </div>
        )
    }
}

export default RestoreWallet;