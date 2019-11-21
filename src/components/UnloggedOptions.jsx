import React from 'react';
import { Link } from 'react-router-dom';
//css
import './css/UnloggedOptions.css'

const restoreButton = {
    key: 'RestoreWalletLink',
    to: '/restore',
    text: 'Restore Wallet',
}

const newButton = {
    key: 'CreateNewLink',
    to: '/create',
    text: 'Create New',

}
const unlockButton = {
    key: 'LoginView',
    to: '/unlock',
    text: 'Unlock Previous',
};

class UnloggedOptions extends React.Component {

    renderButton({key, to, text}) {
        const { location } = this.props;
        if(location.pathname === to) 
            return null;

        return (
            <div key={key} className={`unlogged-option-wrapper${location.pathname === to ? ' unlogged-option-active' : ''}`}>
                <Link className="unlogged-option" to={to}>
                    {text}
                </Link>
            </div>
        )
    }


    render() {
        const { encryptedWalletExist, location, loading } = this.props;
        if(loading) return null;
        return (
            <div className="unlogged-options">
                {encryptedWalletExist && !['/', '/unlock'].includes(location.pathname) && this.renderButton(unlockButton)}
                {this.renderButton(restoreButton)}
                {this.renderButton(newButton)}
            </div>
        )
    }
}

export default UnloggedOptions;