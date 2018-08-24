import { connect } from 'react-redux';
import { TopicItem } from 'cnodejs.react-material';
import { push } from 'connected-react-router';
import * as entitiesSelectors from '../selectors/entities';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  data: entitiesSelectors.getTopic(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(push(`/topic/${id}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicItem);
