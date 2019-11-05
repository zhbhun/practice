import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../constants/Colors';

const defaultState = {
  ids: {},
  data: [],
  hasMore: false,
  loadError: null,
  loading: false,
  page: 1,
  refreshError: null,
  refreshing: false,
};

const useLists = (api) => {
  const stateRef = useRef(null);

  const [state, setState] = useState(defaultState);

  useEffect(() => {
    stateRef.current = state;
  });

  useEffect(() => {
    setState({
      ...defaultState,
      refreshing: true,
    });
    let canceled = false;
    api(1)
      .then(data => {
        if (!canceled) {
          setState({
            ...defaultState,
            ids: data.reduce((rcc, item) => {
              rcc[item.id] = item;
              return rcc;
            }, {}),
            data: data,
            hasMore: true,
          });
        }
      })
      .catch(error => {
        if (canceled) {
          setState({
            ...defaultState,
            refreshError: error.message,
            refreshing: false,
          });
        }
      });
    return () => {
      canceled = true;
    };
  }, [api]);

  const refresh = useCallback(() => {
    const preState = stateRef.current;
    if (preState.refreshing) {
      return;
    }
    setState({
      ...preState,
      refreshing: true,
    });
    let canceled = false;
    api(1)
      .then(data => {
        if (!canceled) {
          setState({
            ...defaultState,
            ids: data.reduce((rcc, item) => {
              rcc[item.id] = item;
              return rcc;
            }, {}),
            data: data,
            hasMore: true,
          });
        }
      })
      .catch(error => {
        if (!canceled) {
          setState({
            ...stateRef.current,
            refreshError: error.message,
            refreshing: false,
          });
        }
      });
    return () => {
      canceled = true;
    };
  }, [api]);

  const loadMore = useCallback(() => {
    const preState = stateRef.current;
    if (preState.refreshing || preState.loading) {
      return;
    }
    setState({
      ...preState,
      loadError: null,
      loading: true,
    });
    let canceled = false;
    api(state.page + 1)
      .then(data => {
        if (!canceled) {
          const {
            ids: oldIds,
            data: oldData,
            page: oldPage,
          } = stateRef.current;
          const newData = data.filter((item) => !oldIds[item.id]);
          setState({
            ...state,
            ids: newData.reduce((rcc, item) => {
              rcc[item.id] = item;
              return rcc;
            }, { ...oldIds }),
            data: [...oldData, ...newData],
            hasMore: newData && newData.length > 0,
            loadError: null,
            loading: false,
            page: oldPage + 1,
          });
        }
      })
      .catch(error => {
        if (!canceled) {
          setState({
            ...stateRef.current,
            loadError: error.message,
            loading: false,
          });
        }
      });
    return () => {
      canceled = true;
    };
  }, [api, state.page]);

  const refreshControl = (
    <RefreshControl
      onRefresh={refresh}
      refreshing={state.refreshing}
      tintColor={Colors.secondaryTextColor}
      title={state.refreshing ? '正在刷新中...' : '下拉刷新'}
      titleColor={Colors.secondaryTextColor}
    />
  );

  let loader = null;
  if (state.data && state.data.length > 0) {
    loader = (
      <View style={styles.loader}>
        {
          !state.hasMore ?
            <Text style={styles.loaderText}>没有更多数据了</Text> :
            null
        }
        {
          state.hasMore && state.loading ?
            (
              <ActivityIndicator
                animating={state.loading}
                color="#999"
                hidesWhenStopped
                size={Platform.OS === 'ios' ? 'small' : 'large'}
              />
            ) :
            null
        }
        {
          state.hasMore && !state.loading && state.loadError ?
            <Text style={styles.loaderText}>加载失败了</Text> :
            null
        }
      </View>
    );
  }

  return [state, refresh, refreshControl, loadMore, loader];
}

const styles = StyleSheet.create({
  loader: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    color: '#999',
  },
})

export default useLists;
