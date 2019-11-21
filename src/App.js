import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "./redux/store";
import RouteContainer from "./containers/RouteContainer";
import { apiLocal, apiProduction, appEnv } from "./configs/global";
import Ajax from "./utils/ajax";
// action
// import {
//     setIsMobile,
//     isMobileQuery,
//     setIsTablet,
//     isTabletQuery
// } from "./redux/walletActions";
import BigNumber from "bignumber.js";


// store
const store = configureStore();
export const dispatch = store.dispatch;
export const getState = store.getState;
export const isIos = /iP(hone|od|ad)/i.test(window.navigator.platform);

// // isMobile mediaQuery handler
// const setIsMobileEvent = () => {
//     dispatch(setIsMobile());
// };
// // isTablet mediaQuery handler
// const setIsTabletEvent = () => {
//     dispatch(setIsTablet());
// };


// window.addEventListener('click', windowClickHandler);

// if (isIos) {
//     document.body.style.cursor = 'pointer';
// }

const App = () => {
    BigNumber.set({
        FORMAT: {
            ...BigNumber.FORMAT,
            decimalSeparator: ".",
            groupSeparator: "",
        }
    });
    // Ajax.baseUrl = appEnv === "production" ? apiProduction : apiLocal;

    // if (matchMedia) {
    //     isTabletQuery.addListener(setIsTabletEvent);
    //     isMobileQuery.addListener(setIsMobileEvent);
    // }

    return (
        <Provider store={store}>
            <Router>
                <RouteContainer dispatch={dispatch} />
            </Router>
        </Provider>
    );
};

export default App;
