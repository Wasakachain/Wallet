import { connect } from 'react-redux';
import RestoreFromMnemonic from '../components/RestoreFromMnemonic';
import { encryptWallet, setLoading } from '../redux/walletActions';


export default connect(
    state => ({
        loading: state.walletReducer.loading,
    }),
    {
        encryptWallet,
        setLoading
    }
)(RestoreFromMnemonic)
