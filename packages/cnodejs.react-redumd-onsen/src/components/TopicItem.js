import dayjs from 'dayjs';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import htmlToText from '../utils/htmlToText';

const styles = {
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

const TopicItem = ({
  classes,
  data,
  onClick,
  components: { UserAvatar }
}) => (
  <Card className={classes.container} onClick={onClick}>
    <CardHeader
      avatar={<UserAvatar id={data.author} />}
      title={data.author}
      subheader={dayjs(data.create_at).format('YYYY-MM-DD HH:mm:ss')}
    />
    <CardContent>
      <Typography className={classes.title} variant="title">
        {data.title}
      </Typography>
      <Typography
        className={classes.content}
        color="textSecondary"
        component="p"
      >
        {htmlToText(data.content)}
      </Typography>
    </CardContent>
  </Card>
);

TopicItem.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  components: PropTypes.shape({
    UserAvatar: PropTypes.func
  }).isRequired
};

export default withStyles(styles)(TopicItem);
