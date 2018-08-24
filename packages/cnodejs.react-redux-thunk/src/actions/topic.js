import * as api from 'cnodejs.api';
import * as schemas from '../constants/schemas';
import * as ActionTypes from '../constants/ActionTypes';
import * as entitiesSelectors from '../selectors/entities';
import * as topicSelectors from '../selectors/topic';

export const loadDetail = id => (dispatch, getState) => {
  if (!topicSelectors.isDetailLoading(getState(), id)) {
    dispatch({ type: ActionTypes.TOPIC_LOAD_REQUEST, meta: { id } });
    api
      .loadTopicDetail(id)
      .then(data => {
        dispatch({
          type: ActionTypes.TOPIC_LOAD_SUCCESS,
          payload: schemas.createTopic(data),
          meta: { id }
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.TOPIC_LOAD_FAILURE,
          payload: error,
          meta: {
            id,
            toast: error.message
          }
        });
      });
  }
};

export const refreshDetail = loadDetail;

export const loadDetailIfNeed = id => (dispatch, getState) => {
  const topic = entitiesSelectors.getTopic(getState(), id);
  if (!topic || !topic.replies) {
    dispatch(loadDetail(id));
  }
};

export const loadList = (tab = 'all', page) => (dispatch, getState) => {
  // 下拉刷新或者分页加载
  if (page === 1 || !topicSelectors.isListLoading(getState(), tab)) {
    dispatch({ type: ActionTypes.TOPICS_LOAD_REQUEST, meta: { tab, page } });
    api
      .loadTopicList(tab, page, 15)
      .then(data => {
        const loadingPage = topicSelectors.getListLoadingPage(getState(), tab);
        if (loadingPage === page) {
          if (!data || data.length === 0) {
            dispatch({
              type: ActionTypes.TOPICS_LOAD_SUCCESS,
              payload: schemas.createTopics([]),
              meta: {
                tab,
                page,
                hasMore: false
              }
            });
          } else {
            dispatch({
              type: ActionTypes.TOPICS_LOAD_SUCCESS,
              payload: schemas.createTopics(data),
              meta: {
                tab,
                page,
                hasMore: true
              }
            });
          }
        }
      })
      .catch(error => {
        const loadingPage = topicSelectors.getListLoadingPage(getState(), tab);
        if (loadingPage === page) {
          dispatch({
            type: ActionTypes.TOPICS_LOAD_FAILURE,
            payload: error,
            meta: {
              tab,
              toast: error.message
            }
          });
        }
      });
  }
};

export const loadListIfNeed = tab => (dispatch, getState) => {
  const topics = topicSelectors.getListData(getState(), tab);
  if (!topics || topics.length === 0) {
    dispatch(loadList(tab, 1));
  }
};

export const refreshList = tab => dispatch => dispatch(loadList(tab, 1));

export const loadListMore = tab => (dispatch, getState) => {
  dispatch(loadList(tab, topicSelectors.getListPage(getState(), tab) + 1));
};

export const collect = id => (dispatch, getState) => {
  if (!topicSelectors.isCollecting(getState(), id)) {
    const topic = entitiesSelectors.getTopic(getState(), id);
    const failMessage = topic.is_collect ? '取消收藏失败' : '收藏失败';
    dispatch({
      type: ActionTypes.TOPIC_COLLECT_REQUEST,
      meta: { id }
    });
    api
      .collectTopic(id, !topic.is_collect)
      .then(() => {
        dispatch({
          type: ActionTypes.TOPIC_COLLECT_SUCCESS,
          payload: schemas.createTopic(
            Object.assign({}, topic, {
              is_collect: !topic.is_collect
            })
          ),
          meta: {
            id
          }
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.TOPIC_COLLECT_FAILURE,
          meta: {
            id,
            toast: failMessage
          }
        });
      });
  }
};

export const likeReply = id => (dispatch, getState) => {
  if (!topicSelectors.isReplyLiking(getState(), id)) {
    const reply = entitiesSelectors.getReply(getState(), id);
    const failMessage = reply.is_uped ? '取消点赞失败' : '点赞失败';
    dispatch({
      type: ActionTypes.REPLY_LIKE_REQUEST,
      meta: { id }
    });
    api
      .likeReply(id)
      .then(action => {
        dispatch({
          type: ActionTypes.REPLY_LIKE_SUCCESS,
          payload: schemas.createReply(
            Object.assign({}, reply, { is_uped: action === 'up' })
          ),
          meta: {
            id
          }
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.REPLY_LIKE_FAILURE,
          meta: {
            id,
            toast: failMessage
          }
        });
      });
  }
};
