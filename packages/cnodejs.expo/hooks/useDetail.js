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
  data: null,
  refreshError: null,
  refreshing: false,
};

const useDetail = (api) => {
  const stateRef = useRef(null);
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    stateRef.current = state;
  });
  useEffect(() => {
    setState({
      ...defaultState,
      refreshError: null,
      refreshing: true,
    });
    let canceled = false;
    api()
      .then(data => {
        if (!canceled) {
          setState({
            ...defaultState,
            data,
            refreshError: null,
            refreshing: false,
          });
        }
      })
      .catch(error => {
        if (!canceled) {
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
    const prevState = stateRef.current;
    setState({
      ...prevState,
      refreshError: null,
      refreshing: true,
    });
    let canceled = false;
    api()
      .then(data => {
        if (!canceled) {
          setState({
            ...stateRef.current,
            data,
            refreshError: null,
            refreshing: false,
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
  const refreshControl = (
    <RefreshControl
      onRefresh={refresh}
      refreshing={state.refreshing}
      tintColor={Colors.secondaryTextColor}
      title={state.refreshing ? '正在刷新中...' : '下拉刷新'}
      titleColor={Colors.secondaryTextColor}
    />
  );
  return [state, setState, refresh, refreshControl];
}

export default useDetail;
