import { connect } from 'react-redux';
import { images, UserAvatar } from 'cnodejs.react-material';
import * as entitiesSelectors from '../selectors/entities';

const mapStateToProps = (state, { id }) => {
  const user = id ? entitiesSelectors.getUser(state, id) : null;
  return {
    src: user && user.avatar_url ? user.avatar_url : images.image_placeholder
  };
};

export default connect(mapStateToProps)(UserAvatar);
