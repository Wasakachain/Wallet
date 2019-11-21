import React from 'react';
import Header from './Header';

class Root extends React.Component {

    renderUnloggedRoute(route) {
        return (
            <div className="unlogged-route-wrapper">
                {route}
            </div>
        )
    }

    render() {
        const { children, wallet } = this.props;
        return (
            <React.Fragment>
                <Header logged={wallet}/>
                {wallet ? children : (
                    this.renderUnloggedRoute(children)
                )}
            </React.Fragment>
        )
    }
}

export default Root;