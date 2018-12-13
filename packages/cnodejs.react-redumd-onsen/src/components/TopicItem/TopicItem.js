import ons from 'onsenui';
import classNames from 'classnames';
import React from 'react';
import classes from './TopicItem.module.scss';
import htmlToText from '../../utils/htmlToText';

const TopicItem = ({ topic, ...props }) => (
  <div
    {...props}
    className={classNames('card', {
      'card--material': ons.platform.isAndroid(),
    })}
  >
    <div
      className={classNames('card__title', {
        'card--material__title': ons.platform.isAndroid(),
      })}
    >
      {topic.title}
    </div>
    <div
      className={classNames('card__content', classes.content, {
        'card--material__content': ons.platform.isAndroid(),
      })}
    >
      {htmlToText(topic.content)}
    </div>
  </div>
);

export default TopicItem;
