import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import WasakaTitle from './WasakaTitle';
// css
import './css/Header.css'


const links = [
    {
        key: 'ViewBalacesLink',
        to: '/balances',
        home: true,
        text: 'Account Balance',
    },
    {
        key: 'SendTransactionLink',
        to: '/send',
        text: 'Send Transaction',
    }
]

class Header extends React.Component {

    constructor() {
        super();
        this.renderLink = this.renderLink.bind(this);
    }

    renderLink({to, key, text}) {
        const { location } = this.props;
        return (
            <div key={key} className={`header-link-wrapper${location.pathname === to ? ' header-link-active' : ''}`}>
                <Link className="header-link" to={to}>
                    {text}
                </Link>
            </div>
        )
    }

    renderLogout() {
        return (
            <div  className="header-link-wrapper">
                <button className="header-link" type="button">
                    Log out
                </button>
            </div>
        )
    }

    render() {
        const { logged } = this.props;
        if(logged) {
            return (
                <header className="header-container logged-header flex-between">
                    <WasakaTitle />
                    <div className="header-links-container flex">
                        {links.map(this.renderLink)}
                        {this.renderLogout()}
                    </div>
                </header>
            )
        }
        return (
            <header className="header-container">
                <WasakaTitle />
            </header>
        )
    }
}

export default withRouter(Header);
