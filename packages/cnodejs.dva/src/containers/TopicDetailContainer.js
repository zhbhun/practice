import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { TopicDetail } from 'cnodejs.react-material';
import * as topicActions from '../actions/topic';
import * as entitiesSelectors from '../selectors/entities';
import * as topicSelectors from '../selectors/topic';
import LoginConfirmContainer from './LoginConfirmContainer';
import ReplyItemContainer from './ReplyItemContainer';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  LoginConfirm: LoginConfirmContainer,
  ReplyItem: ReplyItemContainer,
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  error: topicSelectors.getDetailError(state, id),
  loading: topicSelectors.isDetailLoading(state, id),
  data: entitiesSelectors.getTopic(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onLoad: () => dispatch(topicActions.loadDetailIfNeed(id)),
  onRefresh: () => dispatch(topicActions.refreshDetail(id)),
  onOpenUser: loginname => dispatch(push(`/user/${loginname}`)),
  onCollect: () => dispatch(topicActions.collect(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicDetail);
