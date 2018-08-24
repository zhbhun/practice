import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import htmlToText from '../utils/htmlToText';

const styles = {
  read: {
    backgroundColor: '#eee'
  },
  container: {
    marginBottom: 10,
    borderRadius: 0
  },
  title: {
    marginBottom: 10
  },
  content: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    whiteSpace: 'normal'
  }
};

const MessageItem = ({
  classes,
  data,
  onClick,
  components: { UserAvatar }
}) => (
  <Card
    className={classNames(classes.container, {
      [classes.read]: data.has_read
    })}
    onClick={() => onClick(data.topic.id)}
  >
    <CardHeader
      avatar={<UserAvatar id={data.author} />}
      title={data.author}
      subheader={dayjs(data.reply.create_at).format('YYYY-MM-DD HH:mm:ss')}
    />
    <CardContent>
      <Typography className={classes.title} variant="title">
        {data.topic.title}
      </Typography>
      <Typography
        className={classes.content}
        color="textSecondary"
        component="p"
      >
        {htmlToText(data.reply.content)}
      </Typography>
    </CardContent>
  </Card>
);

MessageItem.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  components: PropTypes.shape({
    UserAvatar: PropTypes.func
  }).isRequired
};

export default withStyles(styles)(MessageItem);
