import { connect } from 'dva';
// import { push } from 'connected-react-router';
import { LoginConfirm } from 'cnodejs.react-material';
import { selectors as userSelectors } from '../models/user';

const mapStateToProps = state => ({
  logon: userSelectors.isSessionLogon(state)
});
const mapDispatchToProps = dispatch => ({
  onLogin: () => null // dispatch(push('/login'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginConfirm);
