import dayjs from 'dayjs';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackButton from '../components/BackButton';

const styles = {
  appBar: {
    paddingBottom: 48
  },
  user: {
    display: 'flex',
    marginTop: '-28px',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userAvatar: {
    margin: '0 auto 10px',
    width: 80,
    height: 80
  },
  userID: {
    margin: '0 auto 5px'
  },
  userGithub: {
    margin: '0 auto 25px',
    color: '#ddd',
    textDecoration: 'underline'
  },
  userMore: {
    margin: '0 0 10px',
    padding: '0 15px',
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tabbar: {
    zIndex: 100,
    marginTop: '-48px'
  },
  contentContainer: {
    position: 'relative'
  },
  content: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  activeContent: {
    display: 'block',
    position: 'static'
  },
  topicContainer: {
    borderRadius: 0
  }
};

class UserDetail extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onLoad: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onOpenTopic: PropTypes.func.isRequired,
    components: PropTypes.shape({
      UserAvatar: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0
    };
    this.scrollTop = {};
    this.contentContainer = React.createRef();
  }

  componentDidMount() {
    this.props.onLoad();
  }

  handleTabChange = (event, nextIndex) => {
    const { tabIndex: currentIndex } = this.state;
    const scrollEle = document.documentElement;
    const stickyScrollTop = this.contentContainer.current.offsetTop;
    this.scrollTop[currentIndex] = scrollEle.scrollTop;
    this.setState({ tabIndex: nextIndex }, () => {
      if (nextIndex !== currentIndex) {
        if (scrollEle.scrollTop > stickyScrollTop) {
          var lastScrollTop = this.scrollTop[nextIndex];
          if (lastScrollTop && lastScrollTop > stickyScrollTop) {
            scrollEle.scrollTop = lastScrollTop;
          } else {
            scrollEle.scrollTop = stickyScrollTop;
          }
        }
      }
    });
  };

  renderHeader() {
    const {
      id,
      classes,
      data,
      components: { UserAvatar }
    } = this.props;
    return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <BackButton />
        </Toolbar>
        <div className={classes.user}>
          <UserAvatar
            alt={id}
            id={id}
            className={classes.userAvatar}
          />
          <Typography
            className={classes.userID}
            align="center"
            color="inherit"
            variant="title"
          >
            {id}
          </Typography>
          <Typography
            align="center"
            color="inherit"
            className={classes.userGithub}
          >
            {data && data.githubUsername
              ? `${data.githubUsername}@github.com`
              : ' '}
          </Typography>
          <div className={classes.userMore}>
            <Typography color="inherit">
              <span>注册时间：</span>
              <span>
                {data && data.create_at
                  ? dayjs(data.create_at).format('YYYY-MM-DD HH:mm:ss')
                  : ' '}
              </span>
            </Typography>
            <Typography color="inherit">
              {data && data.score ? `积分：${data.score}` : ' '}
            </Typography>
          </div>
        </div>
      </AppBar>
    );
  }

  renderTabs() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.tabbar} position="sticky">
        <Tabs
          centered
          fullWidth
          value={this.state.tabIndex}
          onChange={this.handleTabChange}
        >
          <Tab label="最近回复" />
          <Tab label="最近发布" />
          <Tab label="话题收藏" />
        </Tabs>
      </AppBar>
    );
  }

  renderTopicItem = id => {
    const {
      classes,
      onOpenTopic,
      topics,
      components: { UserAvatar }
    } = this.props;
    const topic = topics[id];
    if (!topic) return null;
    return (
      <Card
        key={topic.id}
        className={classes.topicContainer}
        onClick={() => onOpenTopic(topic.id)}
      >
        <CardHeader
          avatar={<UserAvatar id={topic.author} />}
          title={topic.title}
          subheader={`${topic.author}-${topic.last_reply_at}`}
        />
      </Card>
    );
  };

  renderContent() {
    const { classes, data } = this.props;
    const { tabIndex } = this.state;
    return (
      <div
        className={classes.contentContainer}
        ref={this.contentContainer}
        style={{ minHeight: document.documentElement.clientHeight - 48 }}
      >
        <div
          className={classNames(classes.content, {
            [classes.activeContent]: tabIndex === 0
          })}
        >
          {data ? (data.recent_replies || []).map(this.renderTopicItem) : null}
        </div>
        <div
          className={classNames(classes.content, {
            [classes.activeContent]: tabIndex === 1
          })}
        >
          {data ? (data.recent_topics || []).map(this.renderTopicItem) : null}
        </div>
        <div
          className={classNames(classes.content, {
            [classes.activeContent]: tabIndex === 2
          })}
        >
          {data ? (data.collect_topics || []).map(this.renderTopicItem) : null}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}

export default withStyles(styles)(UserDetail);
