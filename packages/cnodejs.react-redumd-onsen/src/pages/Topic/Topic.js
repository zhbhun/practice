import React, { PureComponent } from 'react';
import {
  BackButton,
  Card,
  List,
  ListItem,
  ListTitle,
  Page,
  Toolbar,
} from 'react-onsenui';
import createPage from '../../utils/createPage';
import * as models from '../../models';
import classes from './Topic.module.scss';

class Topic extends PureComponent {
  renderTopic(topic) {
    if (!topic) {
      return null;
    }
    return (
      <Card className={classes.topic}>
        <div className="title">{topic.title}</div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
      </Card>
    );
  }

  renderReplies(replies = []) {
    return (
      <div>
        <ListTitle>{`${replies.length}条回复`}</ListTitle>
        <List
          dataSource={replies}
          renderRow={(reply, index) => {
            return (
              <ListItem key={reply.id}>
                <div dangerouslySetInnerHTML={{ __html: reply.content }} />
              </ListItem>
            );
          }}
        />
      </div>
    );
  }

  render() {
    const { topic } = this.props;
    return (
      <Page
        renderToolbar={() => (
          <Toolbar>
            <div className="left">
              <BackButton>返回</BackButton>
            </div>
            <div className="center">话题</div>
          </Toolbar>
        )}
      >
        {topic ? this.renderTopic(topic) : null}
        {topic && topic.replies ? this.renderReplies(topic.replies) : null}
      </Page>
    );
  }
}

export default createPage({
  models: {
    topicDetail: models.TopicDetail,
  },
  getInitialProps: ({ props: { id }, store, models: { topicDetail } }) => {
    store.dispatch(topicDetail.actions.initiateIfNeed(id));
  },
  mapStateToProps: (state, { models: { topicDetail } }) => {
    const initiate = topicDetail.getInitiate(state);
    return {
      topic: topicDetail.getTopic(state),
      refreshError: initiate.error,
      refreshing: initiate.loading,
    };
  },
  mapDispatchToProps: (dispatch, { models: { topicDetail } }) => ({
    onRefresh: () => dispatch(topicDetail.actions.initiate()),
  }),
})(Topic);
