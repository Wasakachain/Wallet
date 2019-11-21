import { connect } from 'react-redux';
import AccountDetails from '../components/AccountDetails';

export default connect(
    (state, ownProps) => ({
        account: state.walletReducer[ownProps.address],
    }),
)(AccountDetails)
