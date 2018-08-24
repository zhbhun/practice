import PropTypes from 'prop-types';
import React, { Children, cloneElement, Fragment, PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginConfirm extends PureComponent {
  static propTypes = {
    logon: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  handleClick = (event) => {
    event.stopPropagation();
    const { logon, onClick } = this.props;
    if (logon) {
      onClick(event);
    } else {
      this.setState({ visible: true });
    }
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleLogon = () => {
    this.setState({ visible: false });
    this.props.onLogin();
  };

  render() {
    const { logon, onLogin, onClick, children, ...props } = this.props;
    const { visible } = this.state;
    return (
      <Fragment>
        {!logon && visible ? (
          <Dialog open={visible} onClose={this.handleCancel}>
            <DialogTitle>该操作需要登录帐户。是否现在登录？</DialogTitle>
            <DialogActions>
              <Button onClick={this.handleCancel} color="primary">
                取消
              </Button>
              <Button onClick={this.handleLogon} color="primary" autoFocus>
                登录
              </Button>
            </DialogActions>
          </Dialog>
        ) : null}
        {cloneElement(Children.only(children), {
          ...props,
          onClick: this.handleClick
        })}
      </Fragment>
    );
  }
}

export default LoginConfirm;
