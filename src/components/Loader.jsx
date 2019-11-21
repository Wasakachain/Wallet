import React from 'react';

const Loader = (props) => {
    return (
        <div className={`lds-ellipsis${typeof props.className === 'string' ?` ${props.className}` : ''}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}


export default Loader;