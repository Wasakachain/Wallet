import { connect } from 'react-redux';
import Routes from '../routes/Routes';

export default connect(
    state => ({
        wallet: state.walletReducer.wallet,
    })
)(Routes)
