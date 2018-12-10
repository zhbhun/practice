const app = {
  namespace: 'app',
  state: {
    toast: null
  },
  reducers: {
    toast: (state, action) => ({
      ...state,
      toast: action.payload
    })
  }
};

export default app;
