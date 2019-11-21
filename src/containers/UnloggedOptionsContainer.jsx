import { connect } from 'react-redux';
import UnloggedOptions from '../components/UnloggedOptions';

export default connect(
    state => ({
        loading: state.walletReducer.loading,
    })
)(UnloggedOptions)
