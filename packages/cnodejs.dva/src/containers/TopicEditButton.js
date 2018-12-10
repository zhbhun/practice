import { connect } from 'dva';
import { TopicEditButton } from 'cnodejs.react-material';

const mapDispatchToProps = dispatch => ({
  onToast: message =>
    dispatch({
      type: 'app/toast',
      payload: message
    })
});

export default connect(
  null,
  mapDispatchToProps
)(TopicEditButton);
