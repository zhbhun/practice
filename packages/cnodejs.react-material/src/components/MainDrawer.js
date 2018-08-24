import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { cloneElement } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dashboard from '@material-ui/icons/Dashboard';
import MessageIcon from '@material-ui/icons/Message';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import WorkIcon from '@material-ui/icons/Work';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

const styles = {
  header: {
    height: 147,
    padding: 16,
    backgroundSize: 'cover',
    backgroundPosition: 'left bottom',
    backgroundImage: `url(${require('../images/main_nav_header_bg.png')})`
  },
  avatar: {
    marginBottom: 15,
    width: 64,
    height: 64
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  username: {
    color: '#fff',
    fontSize: 15
  },
  userScrore: {
    color: '#eee',
    fontSize: 15
  },
  logout: {
    height: 44,
    width: 60,
    textAlign: 'center'
  },
  logoutText: {
    color: '#eee',
    fontSize: 15,
    lineHeight: '44px'
  },
  menus: {
    width: Math.min(304, window.innerWidth - 56)
  },
  activeMenuItem: {
    backgroundColor: 'rgba(102, 31, 255, 0.12)'
  },
  hidden: {
    display: 'none'
  }
};

const MenuItem = withRouter(
  withStyles(styles)(
    ({
      classes,
      current = false,
      logon = false,
      history,
      location,
      url,
      title,
      icon,
      Container
    }) => {
      const menu = (
        <ListItem
          className={classNames({
            [classes.activeMenuItem]:
              url === `${location.pathname}${location.search}` ||
              (!location.search && url === '/?tab=all')
          })}
          button
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      );
      const onClick = () => {
        if (current) {
          history.replace(url);
        } else {
          history.push(url);
        }
      };
      if (logon) {
        return <Container onClick={onClick}>{menu}</Container>;
      }
      return cloneElement(menu, { onClick });
    }
  )
);

const MainDrawer = ({
  staticContext,
  className,
  classes,
  dispatch,
  history,
  onClose,
  visible,
  user,
  userScore,
  userLogining,
  onLogout,
  components: { UserAvatar, LoginConfirm },
  ...props
}) => (
  <SwipeableDrawer
    {...props}
    className={!visible ? classes.hidden : null}
    onClose={onClose}
  >
    <div className={classes.header}>
      <UserAvatar
        alt=""
        className={classes.avatar}
        id={user}
        onClick={() =>
          !user && !userLogining
            ? history.push('/login')
            : history.push(`/user/${user}`)
        }
      />
      {user ? (
        <div className={classes.user}>
          <div>
            <Typography className={classes.username}>{user}</Typography>
            <Typography className={classes.userScrore}>
              {`积分：${userScore || 0}`}
            </Typography>
          </div>
          <div className={classes.logout} onClick={onLogout}>
            <Typography className={classes.logoutText}>注销</Typography>
          </div>
        </div>
      ) : (
        <Typography className={classes.username}>
          {userLogining ? '登录中...' : '点击头像登录'}
        </Typography>
      )}
    </div>
    <div className={classes.menus} onClick={onClose}>
      <List component="nav">
        <MenuItem url="/?tab=all" icon={<Dashboard />} title="全部" current />
        <MenuItem url="/?tab=good" icon={<StarIcon />} title="精华" current />
        <MenuItem url="/?tab=share" icon={<ShareIcon />} title="分享" current />
        <MenuItem
          url="/?tab=ask"
          icon={<QuestionAnswerIcon />}
          title="问答"
          current
        />
        <MenuItem url="/?tab=job" icon={<WorkIcon />} title="招聘" current />
      </List>
      <Divider />
      <List component="nav">
        <MenuItem
          logon
          url="/message"
          icon={<MessageIcon />}
          title="消息"
          Container={LoginConfirm}
        />
        <MenuItem url="/setting" icon={<SettingsRoundedIcon />} title="设置" />
      </List>
    </div>
  </SwipeableDrawer>
);

MainDrawer.propTypes = {
  ...SwipeableDrawer.propTypes,
  user: PropTypes.string,
  userScore: PropTypes.number,
  userLogining: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  components: PropTypes.shape({
    LoginConfirm: PropTypes.func,
    UserAvatar: PropTypes.func
  }).isRequired
};

export default withRouter(withStyles(styles)(MainDrawer));
