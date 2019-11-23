import { connect } from 'react-redux';
import BalanceView from '../components/BalanceView';
import { getBalances } from '../redux/walletActions';

export default connect(
    state => ({
        addresses: state.walletReducer.addresses,
        totalBalance: state.walletReducer.totalBalance,
        loadingBalances: state.walletReducer.loadingBalances,
    }),
    {
        getBalances
    }
)(BalanceView)
