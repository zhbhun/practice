import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Refresh from '@material-ui/icons/Refresh';
import scrollparent from '../utils/scrollparent';

const styles = {
  container: {
    position: 'relative'
  },
  refreshContainer: {
    position: 'absolute',
    top: '-45px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 44,
    height: 44,
    borderRadius: 22,
    border: '1px solid #ddd',
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  refreshIndicator: {
    width: 32,
    height: 32
  },
  refreshIndicatorActive: {
    animation: 'pull-refresh-rotate 1.4s ease-in-out infinite'
  },
  '@keyframes pull-refresh-rotate': {
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
};

const isWebView =
  typeof navigator !== 'undefined' &&
  /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
const DOWN = 'down';
const UP = 'up';
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', () => null, opts);
} catch (e) {
  // empty
}
const willPreventDefault = supportsPassive ? { passive: false } : false;

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

class StaticRenderer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }
  render() {
    return <div>{this.props.render()}</div>;
  }
}

class PullToRefresh extends React.Component {
  static propTypes = {
    getScrollContainer: PropTypes.func,
    direction: PropTypes.oneOf(['down', 'up']),
    refreshing: PropTypes.bool,
    distanceToRefresh: PropTypes.number,
    onRefresh: PropTypes.func,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    damping: PropTypes.number
  };
  static defaultProps = {
    prefixCls: 'PullToRefresh',
    getScrollContainer: () => undefined,
    direction: DOWN,
    distanceToRefresh: 66,
    damping: 100
  };

  // https://github.com/yiminghe/zscroller/blob/2d97973287135745818a0537712235a39a6a62a1/src/Scroller.js#L355
  // currSt: `activate` / `deactivate` / `release` / `finish`
  state = {
    currSt: 'deactivate',
    dragOnEdge: false
  };

  containerRef;
  contentRef;
  _to;
  _ScreenY;
  _startScreenY;
  _lastScreenY;
  _timer;

  _isMounted = false;

  shouldUpdateChildren = false;

  componentDidMount() {
    this._isMounted = true;
    // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout
    setTimeout(() => {
      this.init(
        this.props.getScrollContainer() ||
          scrollparent(this.containerRef) ||
          this.containerRef
      );
      this.triggerPullToRefresh();
    });
  }

  shouldComponentUpdate(nextProps) {
    this.shouldUpdateChildren = this.props.children !== nextProps.children;
    return true;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps === this.props ||
      prevProps.refreshing === this.props.refreshing
    ) {
      return;
    }
    // triggerPullToRefresh 需要尽可能减少 setState 次数
    this.triggerPullToRefresh();
  }

  componentWillUnmount() {
    // Should have no setTimeout here!
    this.destroy(this.props.getScrollContainer() || this.containerRef);
  }

  showPullToRefresh = () => {
    if (this.props.direction === UP) {
      this._lastScreenY = -this.props.distanceToRefresh - 1;
    }
    if (this.props.direction === DOWN) {
      this._lastScreenY = this.props.distanceToRefresh + 1;
    }
    // change dom need after setState
    this.setState({ currSt: 'release' }, () =>
      this.setContentStyle(this._lastScreenY)
    );
  };

  triggerPullToRefresh = () => {
    // 在初始化时、用代码 自动 触发 pullToRefresh
    // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
    // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
    if (!this.state.dragOnEdge && this._isMounted) {
      if (this.props.refreshing) {
        this.showPullToRefresh();
      } else {
        this.setState({ currSt: 'finish' }, () => this.reset());
      }
    }
  };

  init = ele => {
    if (!ele) {
      // like return in destroy fn ???!!
      return;
    }
    this._to = {
      touchstart: this.onTouchStart.bind(this, ele),
      touchmove: this.onTouchMove.bind(this, ele),
      touchend: this.onTouchEnd.bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this, ele)
    };
    Object.keys(this._to).forEach(key => {
      ele.addEventListener(key, this._to[key], willPreventDefault);
    });
  };

  destroy = ele => {
    if (!this._to || !ele) {
      // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
      return;
    }
    Object.keys(this._to).forEach(key => {
      ele.removeEventListener(key, this._to[key]);
    });
  };

  onTouchStart = (_ele, e) => {
    this._ScreenY = this._startScreenY = e.touches[0].screenY;
    // 一开始 refreshing 为 true 时 this._lastScreenY 有值
    this._lastScreenY = this._lastScreenY || 0;
  };

  isEdge = (ele, direction) => {
    const container = this.props.getScrollContainer();
    if (container && container === document.body) {
      // In chrome61 `document.body.scrollTop` is invalid
      const scrollNode = document.scrollingElement
        ? document.scrollingElement
        : document.body;
      if (direction === UP) {
        return (
          scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight
        );
      }
      if (direction === DOWN) {
        return scrollNode.scrollTop <= 0;
      }
    }
    if (direction === UP) {
      return ele.scrollHeight - ele.scrollTop === ele.clientHeight;
    }
    if (direction === DOWN) {
      return ele.scrollTop <= 0;
    }
  };

  damping = dy => {
    if (Math.abs(this._lastScreenY) > this.props.damping) {
      return 0;
    }

    const ratio =
      Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
    dy *= (1 - ratio) * 0.6;

    return dy;
  };

  onTouchMove = (ele, e) => {
    // 使用 pageY 对比有问题
    const _screenY = e.touches[0].screenY;
    const { direction } = this.props;

    // 拖动方向不符合的不处理
    if (
      (direction === UP && this._startScreenY < _screenY) ||
      (direction === DOWN && this._startScreenY > _screenY)
    ) {
      return;
    }

    if (this.isEdge(ele, direction)) {
      if (!this.state.dragOnEdge) {
        // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
        // 下面这行代码解决了上面这个问题
        this._ScreenY = this._startScreenY = e.touches[0].screenY;

        this.setState({ dragOnEdge: true });
      }
      e.preventDefault();
      // add stopPropagation with fastclick will trigger content onClick event. why?
      // ref https://github.com/ant-design/ant-design-mobile/issues/2141
      // e.stopPropagation();
      const _diff = Math.round(_screenY - this._ScreenY);
      this._ScreenY = _screenY;
      this._lastScreenY += this.damping(_diff);

      this.setContentStyle(this._lastScreenY);

      if (Math.abs(this._lastScreenY) < this.props.distanceToRefresh) {
        if (this.state.currSt !== 'deactivate') {
          // console.log('back to the distance');
          this.setState({ currSt: 'deactivate' });
        }
      } else {
        if (this.state.currSt === 'deactivate') {
          // console.log('reach to the distance');
          this.setState({ currSt: 'activate' });
        }
      }

      // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
      // iOS UIWebView issue, It seems no problem in WKWebView
      if (isWebView && e.changedTouches[0].clientY < 0) {
        this.onTouchEnd();
      }
    }
  };

  onTouchEnd = () => {
    if (this.state.dragOnEdge) {
      this.setState({ dragOnEdge: false });
    }
    if (this.state.currSt === 'activate') {
      this.showPullToRefresh();
      this._timer = setTimeout(() => {
        if (!this.props.refreshing) {
          this.setState({ currSt: 'finish' }, () => this.reset());
        }
        this._timer = undefined;
      }, 1000);
      this.props.onRefresh();
    } else {
      this.reset();
    }
  };

  reset = () => {
    this._lastScreenY = 0;
    this.setContentStyle(0);
  };

  setContentStyle = ty => {
    // todos: Why sometimes do not have `this.contentRef` ?
    if (this.contentRef) {
      setTransform(this.contentRef.style, `translate3d(0px,${ty}px,0)`);
    }
  };

  render() {
    const props = { ...this.props };

    delete props.damping;

    const {
      classes,
      className,
      prefixCls,
      children,
      getScrollContainer,
      direction,
      onRefresh,
      refreshing,
      distanceToRefresh,
      ...restProps
    } = props;

    const renderChildren = (
      <StaticRenderer
        shouldUpdate={this.shouldUpdateChildren}
        render={() => children}
      />
    );

    const renderRefresh = cls => {
      const cla = classNames(
        cls,
        !this.state.dragOnEdge && `${prefixCls}-transition`
      );
      return (
        <div
          className={classNames(
            `${prefixCls}-content-wrapper`,
            classes.container
          )}
        >
          {direction === UP ? renderChildren : null}
          <div className={cla} ref={el => (this.contentRef = el)}>
            <div className={`${prefixCls}-indicator`}>
              <div className={classes.refreshContainer}>
                <Refresh
                  className={classNames(classes.refreshIndicator, {
                    [classes.refreshIndicatorActive]:
                      this.state.currSt === 'release'
                  })}
                  color="primary"
                />
              </div>
            </div>
          </div>
          {direction === DOWN ? renderChildren : null}
        </div>
      );
    };
    if (getScrollContainer()) {
      return renderRefresh(`${prefixCls}-content ${prefixCls}-${direction}`);
    }
    return (
      <div
        ref={el => (this.containerRef = el)}
        className={classNames(
          className,
          prefixCls,
          `${prefixCls}-${direction}`
        )}
        {...restProps}
      >
        {renderRefresh(`${prefixCls}-content`)}
      </div>
    );
  }
}

export default withStyles(styles)(PullToRefresh);
