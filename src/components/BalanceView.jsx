import React from 'react';
// css
import './css/BalanceView.css';
import AccountDetailsContainer from '../containers/AccountDetailsContainer';
import { getTotalBalance } from '../utils/balanceViewFunctions';


class BalanceView extends React.Component {

    renderError() {
        return 'error'
    }

    renderContent() {
        
    }

    render() {
        const { addresses, totalBalance } = this.props;
        if(addresses && addresses.length > 0) {
            return (
                <main className="balance-main">
                    <h2>Wallet Balance</h2>
                    <div className="total-balance-wrapper flex-center">
                        <div className="total-balance">
                            <p className="total-balance-title">Total balance</p>
                            <p className="total-balance-number">{getTotalBalance(totalBalance, ' third-color')}</p>
                        </div>
                    </div>
                    <div className="accounts-balance-wrapper">
                        {addresses.map((address, index) => (
                            <AccountDetailsContainer
                                address={address}
                                index={index}
                            />
                        ))}
                    </div>
                </main>
            )
        }
        return this.renderError();
    }
}

export default BalanceView;