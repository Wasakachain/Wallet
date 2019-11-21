import { connect } from 'react-redux';
import UnlockWallet from '../components/UnlockWallet';
import { decryptWallet } from '../redux/walletActions';


export default connect(
    state => ({
        loading: state.walletReducer.loading,
    }),
    {
        decryptWallet
    }
)(UnlockWallet)
