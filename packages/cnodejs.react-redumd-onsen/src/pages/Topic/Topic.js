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
import timeago from '../../utils/timeago';
import * as models from '../../models';
import Avatar from '../../common/Avatar';
import classes from './Topic.module.scss';

class Topic extends PureComponent {
  renderTopic(topic) {
    if (!topic || !topic.author) {
      return null;
    }
    const { author } = topic;
    return (
      <Card className={classes.topic}>
        <div className="title">{topic.title}</div>
        <div className={classes.author}>
          <Avatar
            className={classes.avatar}
            source={author ? author.avatar_url : ''}
          />
          <div className={classes.anthorContent}>
            <div className={classes.authorName}>
              {author ? author.loginname : ''}
            </div>
            <div className={classes.publish}>
              <span>{timeago(topic.create_at)}</span>
              <span> • </span>
              <span>{`${topic.visit_count}次浏览`}</span>
            </div>
          </div>
        </div>
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
                <div className={classes.replyAuthor}>
                  <Avatar
                    className={classes.replyAvatar}
                    source={reply.author ? reply.author.avatar_url : ''}
                  />
                  <div className={classes.replyAuthorContent}>
                    <div className={classes.replyAuthorName}>
                      {reply.author ? reply.author.loginname : ''}
                    </div>
                    <div className={classes.replyTime}>
                      <span>{timeago(reply.create_at)}</span>
                    </div>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: reply.content }} />
              </ListItem>
            );
          }}
        />
      </div>
    );
  }

  render() {
    const { topic, navigator } = this.props;
    return (
      <Page
        renderToolbar={() => (
          <Toolbar>
            <div className="left">
              <BackButton onClick={() => navigator.popPage()}>返回</BackButton>
            </div>
            <div className="center">话题</div>
          </Toolbar>
        )}
      >
        {topic && topic.id ? this.renderTopic(topic) : null}
        {topic && topic.replies && topic.replies.length > 0
          ? this.renderReplies(topic.replies)
          : null}
      </Page>
    );
  }
}

export default createPage({
  models: {
    topicDetail: models.TopicDetail,
  },
  getInitialProps: ({ props: { match }, store, models: { topicDetail } }) => {
    store.dispatch(topicDetail.actions.initiateIfNeed(match.params.id));
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
