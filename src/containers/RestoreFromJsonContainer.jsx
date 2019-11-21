import { connect } from 'react-redux';
import RestoreFromJson from '../components/RestoreFromJson';
import { decryptWallet } from '../redux/walletActions';


export default connect(
    state => ({
        loading: state.walletReducer.loading,
    }),
    {
        decryptWallet
    }
)(RestoreFromJson)
