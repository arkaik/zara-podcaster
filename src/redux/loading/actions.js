const actions = {
  START_LOADING: 'START_LOADING',
  END_LOADING: 'END_LOADING',

  startLoading: () => ({
    type: actions.START_LOADING
  }),

  endLoading: () => ({
    type: actions.END_LOADING
  }),

};

export default actions;
