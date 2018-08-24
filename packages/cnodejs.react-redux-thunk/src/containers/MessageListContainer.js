import { connect } from 'react-redux';
import { MessageList } from 'cnodejs.react-material';
import * as messageActions from '../actions/message';
import * as messageSelectors from '../selectors/message';
import MessageItemContainer from './MessageItemContainer';

const components = {
  MessageItem: MessageItemContainer
};
const mapStateToProps = state => ({
  loading: messageSelectors.isLoading(state),
  messages: messageSelectors.getData(state),
  components
});
const mapDispatchToProps = (dispatch, { tab }) => ({
  onInit: () => dispatch(messageActions.loadIfNeed()),
  onRefresh: () => dispatch(messageActions.refresh())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
