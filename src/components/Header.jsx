import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WasakaTitle from './WasakaTitle';
import { logout } from '../redux/walletActions';
// css
import './css/Header.css'



function RenderLogout(props) {
    return (
        <div  className="header-link-wrapper">
            <button className="header-link" type="button" onClick={props.logout}>
                Log out
            </button>
        </div>
    )
}
const LogoutButton = connect(
    null,
    {
        logout
    }
)(RenderLogout);

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

    renderLink({to, key, text, home}) {
        const { location } = this.props;
        return (
            <div key={key} className="header-link-wrapper" >
                <Link className={`header-link${location.pathname === to || (location.pathname === '/' && home) ? ' header-link-active' : ''}`} to={to}>
                    {text}
                </Link>
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
                        <LogoutButton/>
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
