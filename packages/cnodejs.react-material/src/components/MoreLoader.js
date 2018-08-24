import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = {
  container: {
    textAlign: 'center'
  },
  progress: {
    margin: '12px auto'
  },
  typography: {
    height: 45,
    lineHeight: '56px',
    fontSize: '16px'
  }
};

class MoreLoader extends PureComponent {
  constructor(props) {
    super(props);

    this.element = null;
    this.io = new IntersectionObserver(this.handleIntersect);
  }

  componentDidMount() {
    this.io.observe(this.element);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hasMore && !this.props.hasMore) {
      this.io.unobserve(this.element);
    }
  }

  componentWillUnmount() {
    this.io.unobserve(this.element);
  }

  handleRef = ref => (this.element = ref);

  handleIntersect = ([entry]) => {
    if (entry.isIntersecting && this.props.hasMore && !this.props.loading) {
      this.props.onLoad();
    }
  };

  render() {
    const { classes, error, hasMore, onLoad } = this.props;
    let content = null;
    if (!hasMore) {
      content = (
        <Typography
          className={classes.typography}
          align="center"
          color="textSecondary"
        >
          没有更多了
        </Typography>
      );
    } else if (error) {
      content = (
        <Typography
          className={classes.typography}
          align="center"
          color="textSecondary"
          onClick={onLoad}
        >
          加载失败，点击重试
        </Typography>
      );
    } else {
      content = <CircularProgress className={classes.progress} size={32} />;
    }
    return (
      <div className={classes.container} ref={this.handleRef}>
        {content}
      </div>
    );
  }
}

MoreLoader.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default withStyles(styles)(MoreLoader);
