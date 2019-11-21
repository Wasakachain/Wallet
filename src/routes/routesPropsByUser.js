import React from 'react';  
import SendTxView from '../components/SendTxView';
//containers
import LoginViewContainer from '../containers/LoginViewContainer';
import BalanceViewContainer from '../containers/BalanceViewContainer';
const loggedRoutes = [
    {
        exact: true,
        path:["/", "/balances"],
        component:BalanceViewContainer,
        key:"BalanceViewContainer",
    },
    {
        exact: true,
        path:"/send",
        component:SendTxView,
        key:"SendTxView",
    },
]

const unloggedRoutes = [
    {
        exact: true,
        path:["/", "/create", "/restore", '/unlock'],
        component:LoginViewContainer,
        key:"LoginViewContainer",
    },
]

const allRoutes = {
    'logged': loggedRoutes,
    'unlogged': unloggedRoutes
}

export default allRoutes;
