import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackButton from './BackButton';

const styles = {
  container: {},
  contentContainer: {},
  appBarTitle: {
    flexGrow: 1
  }
};

const Topic = ({
  classes,
  match,
  components: { TopicDetail, TopicReplyButton }
}) => (
  <div className={classNames('page', classes.container)}>
    <div className={classNames('page-container', classes.contentContainer)}>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography
            variant="title"
            color="inherit"
            className={classes.appBarTitle}
          >
            话题
          </Typography>
        </Toolbar>
      </AppBar>
      <TopicDetail id={match.params.id} />
    </div>
    <TopicReplyButton />
  </div>
);

Topic.propTypes = {
  components: PropTypes.shape({
    TopicDetail: PropTypes.func,
    TopicReplyButton: PropTypes.func
  }).isRequired
};

export default withStyles(styles)(Topic);
