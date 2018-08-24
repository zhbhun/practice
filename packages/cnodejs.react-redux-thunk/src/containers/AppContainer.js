import { connect } from 'react-redux';
import { App } from 'cnodejs.react-material';
import * as appActions from '../actions/app';
import * as userActions from '../actions/user';
import * as appSelectors from '../selectors/app';

const mapStateToProps = state => ({
  toast: appSelectors.getToast(state)
});
const mapDispatchProps = dispatch => ({
  onLoad: () => dispatch(userActions.loginOfLast()),
  onCloseToast: () => dispatch(appActions.toast(null))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(App);
