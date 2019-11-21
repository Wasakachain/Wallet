import React from 'react';
import { WASA } from '../configs/global';
import BigNumber from 'bignumber.js';
import Loader from '../components/Loader';

export function getTotalBalance(totalBalance, className = '') {
    if(typeof totalBalance === 'string') {
        return `${new BigNumber(totalBalance).dividedBy(WASA)} WASA`;
    }
    return <Loader className={`total-balance-loader ${className}`}/>;
}