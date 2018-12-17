import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classes from './Image.module.scss';

class Image extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
  };

  render() {
    const { children, className, source, style, ...props } = this.props;
    return (
      <div
        {...props}
        className={classNames(classes.image, className)}
        style={{
          ...style,
          backgroundImage: `url(${source})`,
        }}
      >
        {children}
      </div>
    );
  }
}

export default Image;
