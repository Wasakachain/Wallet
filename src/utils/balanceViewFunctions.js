import React from 'react';
import { WASA } from '../configs/global';
import BigNumber from 'bignumber.js';
import Loader from '../components/Loader';

export function getFormatedBalance(balance, className = '') {
    let number = '0';
    if(typeof balance === 'string') {
        number = `${new BigNumber(balance).dividedBy(WASA)}`;
    }
    return (
        <React.Fragment>
            {number}
            <span className={`wasa-balance-decorator ${className}`}>WASA</span>
        </React.Fragment>
    )
}

export function getBalanceLoader(className = '') {
    return <Loader className={`total-balance-loader ${className}`}/>;
}