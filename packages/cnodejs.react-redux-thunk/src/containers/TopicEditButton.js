import { connect } from 'react-redux';
import { TopicEditButton } from 'cnodejs.react-material';
import * as appActions from '../actions/app';

const mapDispatchToProps = dispatch => ({
  onToast: message => dispatch(appActions.toast(message))
});

export default connect(
  null,
  mapDispatchToProps
)(TopicEditButton);
