import { connect } from 'react-redux';
import CreateWallet from '../components/CreateWallet';
import { encryptWallet, setLoading } from '../redux/walletActions';


export default connect(
    null,
    {
        encryptWallet,
        setLoading
    }
)(CreateWallet)
