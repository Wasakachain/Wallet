import Ajax from '../utils/ajax';
import { } from 'react-router';
import Wallet from '../models/wallet';

export const isMobileQuery = window.matchMedia("(max-width: 768px) and (min-width: 1px)");
export const isTabletQuery = window.matchMedia("(max-width: 1280px) and (min-width: 769px)");

export const AUTH_TYPES = {
    LOGIN: 'ingresar',
    REGISTER: 'registrarme',
    FORGOT_PASSWORD: 'enviar',
    RESEND_MAIL: 'RESEND_MAIL',
};

export const DEVICE_TYPES = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
}

export const actions = {
    SET_IS_MOBILE: 'SET_IS_MOBILE',
    SET_IS_TABLET: 'SET_IS_TABLET',
    SET_IS_ANIMATING_TRANSITION: 'SET_IS_ANIMATING_TRANSITION',
    SET_MODAL_VISIBILITY: 'SET_MODAL_VISIBILITY',
    SHOW_MODAL_AUTH: 'SHOW_MODAL_AUTH',
    SHOW_SOCKET_ERROR: 'SHOW_SOCKET_ERROR',
    ENCRYPT_WALLET: 'ENCRYPT_WALLET',
    DECRYPT_WALLET: 'DECRYPT_WALLET',
    SET_LOADING: 'SET_LOADING',
    GET_BALANCES: 'GET_BALANCES',
    LOGOUT: 'LOGOUT',
};

export const setIsMobile = () => {
    return {
        type: actions.SET_IS_MOBILE,
    }
};

export const setIsTablet = () => {
    return {
        type: actions.SET_IS_TABLET,
    }
};

export const setIsAnimating = (isAnimating) => ({
    type: actions.SET_IS_ANIMATING_TRANSITION,
    isAnimating
});

export function setLoading(flag) {
    return {
        type: actions.SET_LOADING,
        flag: !!flag,
    }
}

export const encryptWallet = function(mnemonic, password) {
    const wallet = new Wallet(mnemonic);
    return {
        type: actions.ENCRYPT_WALLET,
        payload: wallet.encrypt(password),
        meta: {
            accounts: wallet.accounts
        }
    }
}

export const decryptWallet = function(password) {
    return function(dispatch) {
        return new Promise((res, rej) => {
            let json;
            try {
                json = JSON.parse(localStorage['encryptedWallet']);
            } catch(e) {
                localStorage.removeItem('encryptedWallet');
                return rej({ error: { message: 'Invalid JSON.' }})
            }
            dispatch({
                type: actions.DECRYPT_WALLET,
                payload: Wallet.fromEncryptedJSON(json, password)
            })
            .then(res)
            .catch(rej)
        }) 
    }
}

export function getBalances(ajax, nodeUrl, addresses) {
    ajax.initAjax(nodeUrl + '/addresses/balance', {
        method: 'post',
        body: {
            addresses
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return {
        type: actions.GET_BALANCES,
        payload: ajax.result()
    }
}

export function logout() {
    return {
        type: actions.LOGOUT
    }
}

