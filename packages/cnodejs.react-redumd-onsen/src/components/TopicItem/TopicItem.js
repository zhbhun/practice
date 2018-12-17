import ons from 'onsenui';
import dayjs from 'dayjs';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { entities } from 'redumd';
import * as schemas from '../../schemas';
import htmlToText from '../../utils/htmlToText';
import Avatar from '../../common/Avatar';
import classes from './TopicItem.module.scss';

const TopicItem = ({ dispatch, author, topic, ...props }) => (
  <div
    {...props}
    className={classNames('card', {
      'card--material': ons.platform.isAndroid(),
    })}
  >
    <div className={classes.header}>
      <Avatar
        className={classes.avatar}
        source={author ? author.avatar_url : ''}
      />
      <div className={classes.headerContent}>
        <div className={classes.author}>{author ? author.loginname : ''}</div>
        <div className={classes.publish}>
          {dayjs(topic.create_at).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
    <div
      className={classNames(classes.content, 'card__content', {
        'card--material__content': ons.platform.isAndroid(),
      })}
    >
      <div className={classes.title}>{topic.title}</div>
      {htmlToText(topic.content)}
    </div>
    <div className={classes.footer}>
      <span>{`${topic.visit_count} 访问 `}</span>
      <span>•</span>
      <span>{` ${topic.reply_count} 回复`}</span>
    </div>
  </div>
);

const mapStateToProps = (state, props) => {
  const { topic } = props;
  if (topic && topic.author) {
    return {
      author: schemas.author.getEntity(entities.getState(state), topic.author),
    };
  }
  return {};
};

export default connect(mapStateToProps)(TopicItem);
