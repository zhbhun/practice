import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackButton from './BackButton';

const styles = {
  toolbarTitle: {
    flexGrow: 1
  }
};

const Setting = ({ classes, match }) => (
  <div>
    <AppBar position="sticky">
      <Toolbar>
        <BackButton />
        <Typography
          variant="title"
          color="inherit"
          className={classes.toolbarTitle}
        >
          设置
        </Typography>
      </Toolbar>
    </AppBar>
    <List subheader={<ListSubheader>通知</ListSubheader>}>
      <ListItem>
        <ListItemText
          primary="接受消息推送"
          secondary="开启也没有用，这功能压根没做"
        />
        <ListItemSecondaryAction>
          <Switch checked={false} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    <List subheader={<ListSubheader>主题</ListSubheader>}>
      <ListItem>
        <ListItemText
          primary="夜间模式"
          secondary="开启也没有用，这功能压根没做"
        />
        <ListItemSecondaryAction>
          <Switch checked={false} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    <List subheader={<ListSubheader>话题</ListSubheader>}>
      <ListItem>
        <ListItemText
          primary="保存草稿"
          secondary="开启也没有用，这功能压根没做"
        />
        <ListItemSecondaryAction>
          <Switch checked={false} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </div>
);

export default withStyles(styles)(Setting);
