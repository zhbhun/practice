import { connect } from 'dva';
import { TopicItem } from 'cnodejs.react-material';
// import { push } from 'connected-react-router';
import { selectors as entitiesSelectors } from '../models/entities';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  data: entitiesSelectors.getTopic(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicItem);
