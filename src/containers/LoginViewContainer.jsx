import { connect } from 'react-redux';
import LoginView from '../components/LoginView';

export default connect(
    state => ({
        encryptedWalletExist: state.walletReducer.encryptedWalletExist,
    })
)(LoginView)
