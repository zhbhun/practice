import { connect } from 'react-redux';
import { TopicList } from 'cnodejs.react-material';
import * as topicActions from '../actions/topic';
import * as topicSelectors from '../selectors/topic';
import TopicItemContainer from './TopicItemContainer';

const components = {
  TopicItem: TopicItemContainer
};
const mapStateToProps = (state, { tab }) => ({
  error: topicSelectors.getListError(state, tab),
  loading: topicSelectors.isListLoading(state, tab),
  hasMore: topicSelectors.hasListMore(state, tab),
  topics: topicSelectors.getListData(state, tab),
  components
});
const mapDispatchToProps = (dispatch, { tab }) => ({
  onInit: () => dispatch(topicActions.loadListIfNeed(tab)),
  onRefresh: () => dispatch(topicActions.refreshList(tab)),
  onLoadMore: () => dispatch(topicActions.loadListMore(tab))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicList);
