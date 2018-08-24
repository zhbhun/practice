import { connect } from 'react-redux';
import { MessageItem } from 'cnodejs.react-material';
import * as messageActions from '../actions/message';
import * as entitiesSelectors from '../selectors/entities';
import UserAvatarContainer from './UserAvatarContainer';

const components = {
  UserAvatar: UserAvatarContainer
};
const mapStateToProps = (state, { id }) => ({
  data: entitiesSelectors.getMessage(state, id),
  components
});
const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(messageActions.openMessage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageItem);
