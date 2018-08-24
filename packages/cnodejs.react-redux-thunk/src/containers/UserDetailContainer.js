import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { UserDetail } from 'cnodejs.react-material';
import * as userActions from '../actions/user';
import * as entitiesSelectors from '../selectors/entities';
import * as userSelectors from '../selectors/user';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  topics: entitiesSelectors.getTopics(state),
  error: userSelectors.getDetailError(state, id),
  loading: userSelectors.isDetailLoading(state, id),
  data: entitiesSelectors.getUser(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onOpenTopic: id => dispatch(push(`/topic/${id}`)),
  onLoad: () => dispatch(userActions.loadDetailIfNeed(id)),
  onRefresh: () => dispatch(userActions.refreshDetail(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);
