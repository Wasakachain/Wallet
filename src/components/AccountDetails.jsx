import React from 'react';
import { getTotalBalance } from '../utils/balanceViewFunctions';
// css
import './css/AccountDetails.css'


class AccountDetails extends React.Component {
    render() {
        const { account, index } = this.props;
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
                    <p className="account-balance">
                        {getTotalBalance(account.balance)}
                    </p>
                </div>
            </div>
        )
    }
}

export default AccountDetails;