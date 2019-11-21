import { connect } from 'react-redux';
import BalanceView from '../components/BalanceView';
import { getBalances } from '../redux/walletActions';

export default connect(
    state => ({
        addresses: state.walletReducer.addresses,
    }),
    {
        getBalances
    }
)(BalanceView)
