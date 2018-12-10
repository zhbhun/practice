import { connect } from 'dva';
import { TopicList } from 'cnodejs.react-material';
import { selectors as topicSelectors } from '../models/topic';
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
  onInit: () =>
    dispatch({
      type: 'topic/loadListIfNeed',
      payload: tab
    }),
  onRefresh: () =>
    dispatch({
      type: 'topic/refreshList',
      payload: tab
    }),
  onLoadMore: () =>
    dispatch({
      type: 'topic/loadListMore',
      payload: tab
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicList);
