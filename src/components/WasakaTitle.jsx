import React from 'react';
// assets
import logo from '../assets/imgs/Enmascarar_grupo_1.png';
// css
import './css/WasakaTitle.css';

const WasakaTitle = (props) => {
    return (
        <a href="/">
            <h1 className={props.className}>
                <div className="icon-container">
                    <img src={logo} />
                </div>
                <span className="flex">
                    <span className="title-wasaka">Wasaka</span>
                    <span className="title-faucet">Wallet</span>
                </span>
            </h1>
        </a>
    )
}

export default WasakaTitle;