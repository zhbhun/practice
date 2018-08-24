import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import images from '../images';
import BackButton from './BackButton';

const styles = {
  header: {
    height: 200,
    color: '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${images.login_header_bg})`
  },
  logo: {
    margin: '0 auto',
    width: 240,
    height: 60,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${images.logo})`
  },
  form: {
    marginTop: '-40px'
  }
};

const Login = ({
  classes,
  history,
  location,
  match,
  components: { LoginForm }
}) => (
  <div>
    <div className={classes.header}>
      <Toolbar>
        <BackButton />
        <Typography variant="title" color="inherit">
          登录
        </Typography>
      </Toolbar>
      <div className={classes.logo} />
      <Typography align="center" color="inherit" variant="title">
        cnodejs.org
      </Typography>
    </div>
    <LoginForm
      className={classes.form}
      onLogon={() => {
        if (location.state && location.state.root) {
          history.replace('/');
        } else {
          history.goBack();
        }
      }}
    />
  </div>
);

Login.propTypes = {
  components: PropTypes.shape({
    LoginForm: PropTypes.func
  }).isRequired
};

export default withStyles(styles)(Login);
