import React, { createRef, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { Icon, Page, PullHook, Toolbar, ToolbarButton } from 'react-onsenui';
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import createPage from '../../utils/createPage';
import TopicFeeds from '../../models/TopicFeeds';
import TopicItem from '../../components/TopicItem';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      pullHookState: 'initial',
    };
    this.page = createRef();
    this.pageContentEle = null;
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: false,
    });
  }

  componentDidMount() {
    const pageEle = findDOMNode(this.page.current);
    if (pageEle) {
      const pageContentEle = pageEle.querySelector('.page__content');
      this.pageContentEle = pageContentEle;
    }
    this.setState({ mounted: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refreshing && !this.props.refreshing) {
      this.setState({ pullHookState: 'initial' });
      if (this.refreshDone) {
        this.refreshDone();
        this.refreshDone = null;
      }
    }
    if (prevProps.moreLoading && !this.props.moreLoading) {
      if (this.loadMoreDone) {
        this.loadMoreDone();
        this.loadMoreDone = null;
      }
    }
  }

  onPullHookChange = ({ state }) => {
    this.setState({ pullHookState: state });
  };

  onRefresh = done => {
    this.refreshDone = done;
    this.props.onRefresh();
  };

  onLoadMore = () => {
    this.props.onLoadMore();
    return new Promise(resolve => {
      this.loadMoreDone = resolve;
    });
  };

  isRowLoaded = ({ index }) => {
    const count = this.props.topics ? this.props.topics.length : 0;
    return index < count;
  };

  renderTopic = ({ key, index, parent, style }) => {
    const topic = this.props.topics[index];
    if (!topic) {
      return index > 0 ? <div key={key}>加载中...</div> : null;
    }
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        <div style={style}>
          <TopicItem
            onClick={() =>
              this.props.navigator.pushPage({
                path: '/topic',
                passProps: { id: topic.id },
              })
            }
            topic={topic}
          />
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const { topics } = this.props;
    const { mounted, pullHookState } = this.state;
    return (
      <Page
        ref={this.page}
        renderToolbar={() => (
          <Toolbar>
            <div className="left">
              <ToolbarButton>
                <Icon icon="md-menu" />
              </ToolbarButton>
            </div>
            <div className="center">CNode 社区</div>
          </Toolbar>
        )}
      >
        <PullHook onChange={this.onPullHookChange} onLoad={this.onRefresh}>
          {pullHookState === 'initial' ? (
            <span>
              <Icon size={35} spin={false} icon="ion-arrow-down-a" />
              <span>下拉刷新</span>
            </span>
          ) : pullHookState === 'preaction' ? (
            <span>
              <Icon size={35} spin={false} icon="ion-arrow-up-a" />
              <span>松开刷新</span>
            </span>
          ) : (
            <span>
              <Icon size={35} spin icon="ion-load-d" />
              <span>加载中...</span>
            </span>
          )}
        </PullHook>
        {mounted ? (
          <WindowScroller scrollElement={this.pageContentEle}>
            {({ height, width, isScrolling, registerChild, scrollTop }) => {
              if (!height || !width) {
                return null;
              }
              const rowCount = topics ? topics.length + 1 : 0;
              return (
                <div ref={registerChild}>
                  <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.onLoadMore}
                    rowCount={rowCount}
                  >
                    {props => (
                      <List
                        ref={props.registerChild}
                        autoHeight
                        deferredMeasurementCache={this.cache}
                        height={height}
                        width={width}
                        isScrolling={isScrolling}
                        onRowsRendered={props.onRowsRendered}
                        rowCount={rowCount}
                        rowHeight={this.cache.rowHeight}
                        rowRenderer={this.renderTopic}
                        scrollTop={scrollTop}
                      />
                    )}
                  </InfiniteLoader>
                </div>
              );
            }}
          </WindowScroller>
        ) : null}
      </Page>
    );
  }
}

export default createPage({
  models: {
    topicFeeds: TopicFeeds,
  },
  getInitialProps: ({ store, models: { topicFeeds } }) => {
    store.dispatch(topicFeeds.actions.initiateIfNeed());
  },
  mapStateToProps: (state, { models: { topicFeeds } }) => {
    const initiate = topicFeeds.getInitiate(state);
    const loadMore = topicFeeds.getLoadMore(state);
    return {
      topics: topicFeeds.getTopics(state),
      hasMore: topicFeeds.hasMore(state),
      moreLoadError: loadMore.error,
      moreLoading: loadMore.loading,
      refreshError: initiate.error,
      refreshing: initiate.loading,
    };
  },
  mapDispatchToProps: (dispatch, { models: { topicFeeds } }) => ({
    onRefresh: () => dispatch(topicFeeds.actions.initiate()),
    onLoadMore: () => dispatch(topicFeeds.actions.loadMore()),
  }),
})(Home);
