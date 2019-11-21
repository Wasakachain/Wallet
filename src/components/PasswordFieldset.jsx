import React from 'react';
// css
import './css/PasswordFieldset.css'

class PasswordFieldset extends React.Component {
    state = {
        show: false
    }

    render() {
        const { show } = this.state;
        return (
            <fieldset className="password-wallet-fieldset">
                <label className="password-wallet-label">Password (optional)</label>
                <div className="password-wallet-input-wrapper">
                    <input 
                        id="wallet-password"
                        className="password-wallet-input" 
                        type={show ? "text" : "password"}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => this.setState({show: !show})}
                    >
                        {show ? "hide" : "show"}
                    </button>
                </div>
            </fieldset>
        )
    }
}

export default PasswordFieldset;