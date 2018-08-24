import { connect } from 'react-redux';
import { LoginForm } from 'cnodejs.react-material';
import * as userActions from '../actions/user';
import * as userSelectors from '../selectors/user';

const mapStateToProps = state => ({
  logon: userSelectors.isSessionLogon(state),
  logining: userSelectors.isSessionLogining(state),
  loginError: userSelectors.getSessionLoginError(state)
});
const mapDispatchToProps = dispatch => ({
  onLogin: accesstoken => dispatch(userActions.login(accesstoken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
