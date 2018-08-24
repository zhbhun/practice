import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  container: {},
  contentContainer: {},
  headerTitle: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawerHeader: {
    height: 134,
    padding: 16
  },
  hidden: {
    display: 'none'
  }
};

class Home extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    components: PropTypes.shape({
      MainDrawer: PropTypes.func,
      TopicList: PropTypes.func,
      TopicEditButton: PropTypes.func
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    };
  }

  openDrawer = () => this.setState({ drawerOpen: true });

  closeDrawer = () => this.setState({ drawerOpen: false });

  render() {
    const {
      classes,
      location,
      visible,
      components: { MainDrawer, TopicList, TopicEditButton }
    } = this.props;
    const { drawerOpen } = this.state;
    const query = queryString.parse(location.search);
    return (
      <div className={classNames('page', classes.container)}>
        <div className={classNames('page-container', classes.contentContainer)}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.openDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.headerTitle}
              >
                CNode社区
              </Typography>
            </Toolbar>
          </AppBar>
          <TopicList tab={query.tab || 'all'} />
          <MainDrawer
            visible={visible}
            open={drawerOpen}
            onOpen={this.openDrawer}
            onClose={this.closeDrawer}
          />
        </div>
        <TopicEditButton />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
