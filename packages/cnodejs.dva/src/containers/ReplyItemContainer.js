import { connect } from 'react-redux';
import { ReplyItem } from 'cnodejs.react-material';
import * as appActions from '../actions/app';
import * as topicActions from '../actions/topic';
import * as entitiesySelectors from '../selectors/entities';
import LoginConfirmContainer from './LoginConfirmContainer';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  LoginConfirm: LoginConfirmContainer,
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  data: entitiesySelectors.getReply(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onToast: message => dispatch(appActions.toast(message)),
  onLike: () => dispatch(topicActions.likeReply(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyItem);
