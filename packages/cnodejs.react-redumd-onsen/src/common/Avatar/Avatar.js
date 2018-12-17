import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Image from '../Image';
import classes from './Avatar.module.scss';

class Avatar extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
  };

  render() {
    const { className, ...props } = this.props;
    return (
      <Image {...props} className={classNames(classes.avatar, className)} />
    );
  }
}

export default Avatar;
