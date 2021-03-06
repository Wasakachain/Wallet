// action
import { actions, isMobileQuery, isTabletQuery, AUTH_TYPES, DEVICE_TYPES } from './walletActions';
import Wallet from '../models/wallet';
import { stat } from 'fs';
import BigNumber from 'bignumber.js';

const initialState = {
    viewPortType: isMobileQuery.matches ? DEVICE_TYPES.mobile :  (isTabletQuery.matches ? DEVICE_TYPES.tablet :  DEVICE_TYPES.desktop),
    encryptedWalletExist: !!localStorage['encryptedWallet'],
    wallet: false,
};
function formatAccounts(state, accounts) {
    const newState = {
        ...state,
        addresses: [],
        encryptedWalletExist: true,
        wallet: true,
    };

    accounts.map(account => {
        newState.addresses.push(account.address);
        newState[account.address] = account.getData();
    })

    return newState;
}
function setAccountsBalances(state, data) {
    if(state.addresses && state.addresses.length > 0 && data) {
        let total = new BigNumber(0);
        const newState = {
            ...state,
            loadingBalances: false,
        };
    
        state.addresses.map(address => {
            if(newState[address] && data[address]) {
                total = total.plus(data[address].confirmedBalance);
                newState[address] = {
                    ...newState[address],
                    ...data[address]
                };
            }
        })
        newState.totalBalance = total.toString();
        return newState;
    }
    return state;
}
const mnemonic = 'burden royal photo direct vague topple dice injury very also monkey absurd';
const test = new Wallet(mnemonic);
// export default function utilityReducer(state = formatAccounts(initialState, test.accounts), action = null) {
export default function utilityReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.SET_IS_MOBILE:
            return {
                ...state,
                viewPortType: isMobileQuery.matches ? DEVICE_TYPES.mobile :  (isTabletQuery.matches ? DEVICE_TYPES.tablet :  DEVICE_TYPES.desktop),
            };
        case actions.SET_IS_TABLET:
            return {
                ...state,
                viewPortType: isMobileQuery.matches ? DEVICE_TYPES.mobile :  (isTabletQuery.matches ? DEVICE_TYPES.tablet :  DEVICE_TYPES.desktop),
            };
        case actions.SET_IS_ANIMATING_TRANSITION:
            return {
                ...state,
                isAnimatingTransition: action.isAnimating,
            };
        case actions.SET_LOADING:
            return {
                ...state,
                loading: action.flag,
            };
        case actions.GET_BALANCES + '_START':
        case actions.GET_BALANCES + '_ERROR':
            return {
                ...state,
                loadingBalances: action.type.includes('_START'),
            };
        case actions.GET_BALANCES + '_SUCCESS':
            return setAccountsBalances(state, action.payload && action.payload.data);
        case actions.DECRYPT_WALLET + '_START':
        case actions.ENCRYPT_WALLET + '_START':
        case actions.DECRYPT_WALLET + '_ERROR':
        case actions.ENCRYPT_WALLET + '_ERROR':
            return {
                ...state,
                loading: action.type.includes('_START'),
            };
        case actions.ENCRYPT_WALLET + '_SUCCESS':
            localStorage['encryptedWallet'] = JSON.stringify(action.payload);
        case actions.DECRYPT_WALLET + '_SUCCESS':
            return formatAccounts(state, action.type.includes(actions.ENCRYPT_WALLET) ? action.meta.accounts : action.payload.accounts)
        case actions.LOGOUT:
            localStorage.removeItem('encryptedWallet');
            return {
                viewPortType: isMobileQuery.matches ? DEVICE_TYPES.mobile :  (isTabletQuery.matches ? DEVICE_TYPES.tablet :  DEVICE_TYPES.desktop),
                encryptedWalletExist: false,
                wallet: false,
            };
        default: return state;
    }
}