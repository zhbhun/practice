import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { LoginConfirm } from 'cnodejs.react-material';
import * as userSelectors from '../selectors/user';

const mapStateToProps = state => ({
  logon: userSelectors.isSessionLogon(state)
});
const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(push('/login'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginConfirm);
