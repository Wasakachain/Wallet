import React from 'react';
import { withRouter } from 'react-router';
import RestoreWallet from './RestoreWallet';
import CreateWalletContainer from '../containers/CreateWalletContainer';
import UnlockWalletContainer from '../containers/UnlockWalletContainer';
import UnloggedOptionsContainer from '../containers/UnloggedOptionsContainer';
//css
import './css/LoginView.css'


class LoginView extends React.Component {

    renderContent(location, encryptedWalletExist) {
        switch(location.pathname) {
            case "/restore":
                return <RestoreWallet history={this.props.history} />;
            case "/create":
                return <CreateWalletContainer history={this.props.history} />;
            default:
                return encryptedWalletExist ? <UnlockWalletContainer history={this.props.history} /> : null;
        }
    }

    render() {
        const { location, encryptedWalletExist } = this.props;
        return (
            <main className="login-main">
                {this.renderContent(location, encryptedWalletExist)}
                <UnloggedOptionsContainer
                    encryptedWalletExist={encryptedWalletExist}
                    location={location}
                />
            </main>
        )
    }
}

export default withRouter(LoginView);