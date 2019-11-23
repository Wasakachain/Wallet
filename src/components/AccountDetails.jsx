import React from 'react';
import { getBalanceLoader, getFormatedBalance } from '../utils/balanceViewFunctions';
// css
import './css/AccountDetails.css'


class AccountDetails extends React.Component {
    render() {
        const { account, index, loadingBalances } = this.props;
        return (
            <div className="account-detail">
                <div className="account-addresss-wrapper">
                    <p className="account-title">Address {index + 1}</p>
                    <p className="account-addresss">
                        0x{account.address}
                    </p>
                </div>
                <div className="account-balance-wrapper">
                    <p className="account-title">Balance</p>
                    {loadingBalances ? (
                        getBalanceLoader() 
                    ) : (
                        <p className="account-balance">{getFormatedBalance(account.confirmedBalance)}</p>
                    )}
                </div>
            </div>
        )
    }
}

export default AccountDetails;