import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = {
  formCard: {
    margin: 'auto',
    width: 304
  },
  commitButton: {
    marginTop: 15
  },
  formTip: {
    margin: '20px auto',
    textDecoration: 'underline'
  },
  logininContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logininContentText: {
    marginLeft: 20,
  }
};

class LoginForm extends PureComponent {
  static propTypes = {
    logon: PropTypes.bool.isRequired,
    logining: PropTypes.bool.isRequired,
    loginError: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onLogon: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      tipOpen: false,
      accesstoken: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.logon && this.props.logon) {
      this.props.onLogon();
    }
  }

  handleAccessTokenChange = event => {
    this.setState({ accesstoken: event.target.value });
  };

  handleOpenTip = () => this.setState({ tipOpen: true });

  handleCloseTip = () => this.setState({ tipOpen: false });

  render() {
    const { classes, className, logining, loginError, onLogin } = this.props;
    return (
      <div className={className}>
        <Card className={classes.formCard}>
          <CardContent>
            <form>
              <TextField
                error={!!loginError}
                helperText={loginError ? loginError : ''}
                id="accesstoken"
                label="Access Token："
                fullWidth
                margin="normal"
                value={this.state.accesstoken}
                onChange={this.handleAccessTokenChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.commitButton}
                fullWidth
                onClick={() => onLogin(this.state.accesstoken)}
              >
                登录
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography
          className={classes.formTip}
          align="center"
          color="primary"
          onClick={this.handleOpenTip}
        >
          如何获取 Access Token？
        </Typography>
        <Dialog open={this.state.tipOpen} onClose={this.handleCloseTip}>
          <DialogContent>
            <DialogContentText>
              在 CNode
              社区网站端登录你的账户，然后在右上角找到“设置”按钮，点击进入后将页面滑动到最底部来查看你的
              Access Token。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseTip} color="primary" autoFocus>
              确定
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={logining} disableBackdropClick disableEscapeKeyDown>
          <DialogContent className={classes.logininContent}>
            <CircularProgress size={24} />
            <DialogContentText className={classes.logininContentText}>
              正在加载中
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
