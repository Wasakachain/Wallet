import React from 'react';

const keysWith0x = [
    'to',
    'from',
    'senderPubKey',
    'transactionDataHash'
]

export function renderSignedTxKey(key) {
    const { tx } = this;
    if(key !== 'senderSignature') {
        return (
            <p className="signed-tx-text" key={key}>
                <span className="signed-tx-key">"{key}":</span>
                "{(keysWith0x.includes(key) ? '0x': '')}{tx[key]}"
            </p>
        ) 
    }
    return (
        <React.Fragment key={key}>
            <p className="signed-tx-text">
                <span  className="signed-tx-key">"{key}":</span> {'['}
            </p>
            {tx[key].map((element, index) => (
                <p className="signed-tx-sign-text" key={`${key}-${index}`}>"0x{element}"</p>
            ))}
            <p className="signed-tx-text">{']'}</p>
        </React.Fragment>
    )
}

export function renderSignedTx(signedTx) {
    return (
        <div className="signed-tx">
            <p>{'{'}</p>
            {Object.keys(signedTx).map(this.renderSignedTxKey)}
            <p>{'}'}</p>
        </div>
    )
}