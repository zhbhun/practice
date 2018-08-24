import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import timeago from '../utils/timeago';
import PullToRefresh from './PullToRefresh';

const styles = {
  contentContainer: {
    marginBottom: 10,
    borderRadius: 0
  }
};

class TopicDetail extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    onLoad: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onOpenUser: PropTypes.func.isRequired,
    onCollect: PropTypes.func.isRequired,
    components: PropTypes.shape({
      LoginConfirm: PropTypes.func,
      ReplyItem: PropTypes.func,
      UserAvatar: PropTypes.func
    }).isRequired
  };

  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.props.onLoad();
    }
  }

  handleAvatarClick = () => {
    const { data, onOpenUser } = this.props;
    if (data && data.author) {
      onOpenUser(data.author);
    }
  };

  render() {
    const {
      loading,
      data,
      classes,
      onRefresh,
      onCollect,
      components: {
        LoginConfirm,
        ReplyItem,
        UserAvatar
      }
    } = this.props;
    let content = null;
    if (data) {
      const replies = data.replies || [];
      content = (
        <Fragment>
          <Card className={classes.contentContainer}>
            <CardHeader title={data.title} />
            <CardHeader
              avatar={
                <UserAvatar
                  id={data.author}
                  onClick={this.handleAvatarClick}
                />
              }
              title={data.author}
              subheader={timeago(data.create_at)}
              action={
                <CardActions>
                  <LoginConfirm onClick={onCollect}>
                    <IconButton color={data.is_collect ? 'primary' : undefined}>
                      <FavoriteIcon />
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
          </Card>
          <Card className={classes.contentContainer}>
            {replies.length === 0 ? (
              <CardHeader align="center" title="暂无回复" />
            ) : (
              <Fragment>
                <CardHeader title={`${replies.length}条回复`} />
                {replies.map(id => (
                  <ReplyItem key={id} id={id} />
                ))}
              </Fragment>
            )}
          </Card>
        </Fragment>
      );
    }
    return (
      <PullToRefresh onRefresh={onRefresh} refreshing={loading}>
        {content}
      </PullToRefresh>
    );
  }
}

export default withStyles(styles)(TopicDetail);
