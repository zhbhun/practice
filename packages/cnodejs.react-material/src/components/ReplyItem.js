import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import timeago from '../utils/timeago';

const styles = {
  contentText: {}
};

const ReplyItem = ({
  classes,
  data,
  onToast,
  onLike,
  components: { LoginConfirm, UserAvatar }
}) => (
  <div id={data.id}>
    <Divider />
    <CardHeader
      avatar={<UserAvatar id={data.author} />}
      title={data.author}
      subheader={timeago(data.create_at)}
      action={
        <CardActions>
          <LoginConfirm onClick={onLike}>
            <IconButton color={data.is_uped ? 'primary' : undefined}>
              <ThumbUpIcon />
            </IconButton>
          </LoginConfirm>
          <LoginConfirm onClick={() => onToast('暂时不支持回复评论')}>
            <IconButton>
              <ReplyIcon />
            </IconButton>
          </LoginConfirm>
        </CardActions>
      }
    />
    <CardContent>
      <Typography
        component="p"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </CardContent>
  </div>
);

ReplyItem.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onToast: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  components: PropTypes.shape({
    LoginConfirm: PropTypes.func,
    UserAvatar: PropTypes.func
  }).isRequired
};

export default withStyles(styles)(ReplyItem);
