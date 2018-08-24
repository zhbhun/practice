import { connect } from 'react-redux';
import { MessageMark } from 'cnodejs.react-material';
import * as messageActions from '../actions/message';

const mapDispatchToProps = (dispatch, { id }) => ({
  onClick: () => dispatch(messageActions.maskAllRead())
});

export default connect(
  null,
  mapDispatchToProps
)(MessageMark);
