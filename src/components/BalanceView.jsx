import React from 'react';
// css
import './css/BalanceView.css';
import AccountDetailsContainer from '../containers/AccountDetailsContainer';
import {getFormatedBalance, getBalanceLoader } from '../utils/balanceViewFunctions';
import Ajax from '../utils/ajax';


// const urlRegex = new RegExp(/^(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);

class BalanceView extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCatch = this.onCatch.bind(this);
    }

    state = {
        showBalances: false,
        showError: false
    }

    onChange({ target }) {
        target.value =  target.value ? target.value.replace(/\s/g, '') : '';
        this.url = target.value;
    }

    onCatch(e) {
        this.setState({ showError: true, error: typeof e.message === 'string' ? e.message : 'Invalid url.' });
    }

    onSubmit(e) {
        e.preventDefault();
        const { loadingBalances } = this.props;
        if(loadingBalances) return null;

        if(this.state.showError) {
            this.setState({ showError: false, error: null });
        }
        this.ajax = new Ajax();
        this.props.getBalances(this.ajax, /^https?:\/\//.test(this.url) ? this.url : 'http://' + this.url, this.props.addresses).catch(this.onCatch);
    }

    renderError() {
        return 'error'
    }

    renderContent() {
        const { addresses, totalBalance, loadingBalances } = this.props;
        return (
            <React.Fragment>
                <div className="total-balance-wr    apper flex-center">
                    <div className="total-balance">
                        <p className="total-balance-title">Total balance</p>
                        {loadingBalances ? (
                            getBalanceLoader(' third-color') 
                        ) : (
                            <p className="total-balance-number">
                                {getFormatedBalance(totalBalance)}
                            </p>
                        )}
                    </div>
                </div>
                <div className="accounts-balance-wrapper">
                    {addresses.map((address, index) => (
                        <AccountDetailsContainer
                            key={`address-details-${address}`}
                            address={address}
                            index={index}
                            loadingBalances={loadingBalances}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }

    renderNodeURLForm() {
        const { error, showError } = this.state;
        return (
            <div className="node-url-form-wrapper">
                <form
                    className="node-url-form"
                    onSubmit={this.onSubmit}
                >
                    <fieldset
                        className="node-url-fieldset"
                    >
                        <label
                            className="node-url-label"
                            htmlFor="node-url-input"
                        >
                            Node URL
                        </label>
                        <input 
                            className="node-url-input"
                            id="node-url-input"
                            onChange={this.onChange}
                            required
                        />
                    </fieldset>
                    <div className="node-url-submit-wrapper flex-center">
                        <button
                            className="node-url-submit unlogged-option"
                            type="submit"
                        >
                            Get Balances
                        </button>
                    </div>
                </form>
                {showError && typeof error ===  'string' && (
                    <div className="flex-center">
                        <p className="error-input">{error}</p>
                    </div>
                )}
            </div>
        )
    }

    render() {
        const { addresses } = this.props;
        if(addresses && addresses.length > 0) {
            return (
                <main className="balance-main">
                    <h2>Wallet Balance</h2>
                    {this.renderNodeURLForm()}
                    {this.renderContent()}
                </main>
            )
        }
        return this.renderError();
    }
}

export default BalanceView;