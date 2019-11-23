import { connect } from 'react-redux';
import SendTxForm from '../components/SendTxForm';

let memo = {};

function getAddressesAndPk(state) {
    if(memo.addresses !== state.walletReducer.addresses) {
        memo.privateKeys = {};
        memo.publicKeys = {};
        state.walletReducer.addresses.map(address => {
            memo.privateKeys[address] = state.walletReducer[address].privateKey;
            memo.publicKeys[address] = state.walletReducer[address].publicKey;
        })
    }
    memo.addresses = state.walletReducer.addresses;
    return memo;
}

export default connect(
    getAddressesAndPk,
)(SendTxForm)
