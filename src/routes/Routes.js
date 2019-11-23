import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router";
import Ajax from "../utils/ajax";
// components
import Root from "../components/Root";
// import LoadingScreen from "../components/LoadingScreen";
// import ErrorView from '../components/ErrorView';
// routes props
import allRoutes from "./routesPropsByUser";

class Routes extends Component {
    constructor(props) {
        super(props);
        this.routes = [];
        this.isLogout = false;
		this.checkUserSession();
    }

    shouldComponentUpdate(nextProps) {
        const { wallet: nextWallet } = nextProps;
        const { wallet } = this.props;
        if ((!wallet && nextWallet) || (wallet && !nextWallet)) {
            return true;
        }
        return false;
    }

    checkUserSession() {
        // const data = localStorage.hasOwnProperty("gd")
        //     ? JSON.parse(localStorage.getItem("gd"))
        //     : null;
        // this.roleName = "all";
        // if (data) {
        //     const { dispatch } = this.props;
        //     Ajax.token = data.token;
        //     const ajax = new Ajax("wallet/get_user_data");
        //     connectWithSocket(data);
        //     getCountUnreadNotifications();
        //     if (allUserRoles.includes(data.roleName)) {
        //         dispatch(setUserData(data, true));
        //     }
        //     dispatch(getUserData(ajax, data.token)).catch(e => {
        //         if (e.status === 401) {
        //             this.roleName = "all";
        //             this.forceUpdate();
        //         }
        //     });
        //     if (allUserRoles.includes(data.roleName)) {
        //         this.roleName = data.roleName;
        //     } else {
        //         localStorage.removeItem("gd");
        //     }
        // } else {
        //     connectWithSocket();
        // }
    }

    render404() {
        return (
            '404'
            // <ErrorView
            //     errorTitle="El contenido que estas buscando no existe"
            //     errorButtonText={errorButtonText}
            //     redirect={redirectUrl}
            // />
        )
    }

    render() {
        const routes = this.props.wallet ? 'logged' : 'unlogged';
        console.log(this.props);
        return (
            <Root wallet={this.props.wallet}>
                <Switch>
                    {allRoutes[routes].map(routeProps => (
                        <Route {...routeProps} />
                    ))}
                    {/*<Route render={() => this.render404() } />*/}
                    <Route render={() => <Redirect to="/"/> }/>
                </Switch>
            </Root>
        );
    }
}

export default Routes;
