import actions from './actions.js';

const initialState = {
  name: '',
  summary: '',
  episodeList: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_PODCAST_SUCCESS:
      const podcast = action.payload;
      return { ...state, ...podcast };

    case actions.CLEAN_PODCAST:
      return initialState;

    default:
      return state;
  }
};
