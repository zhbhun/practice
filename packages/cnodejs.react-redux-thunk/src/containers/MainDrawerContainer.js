import { connect } from 'react-redux';
import { MainDrawer } from 'cnodejs.react-material';
import * as userActions from '../actions/user';
import * as entitiesSelectors from '../selectors/entities';
import * as userSelectors from '../selectors/user';
import LoginConfirmContainer from './LoginConfirmContainer';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  LoginConfirm: LoginConfirmContainer,
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = state => {
  const userLoginname = userSelectors.getSessionUserId(state);
  const user = entitiesSelectors.getUser(state, userLoginname);
  return {
    user: userLoginname,
    userScore: user && user.score,
    userLogining: userSelectors.isSessionLogining(state),
    components
  };
};
const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(userActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDrawer);
