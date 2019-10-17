import actions from './actions.js';

const initialState = {
  episodeList: [],
  summary: 'No description available',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_PODCAST_SUCCESS:
      const podcast = action.payload;
      return { ...state, ...podcast };

    default:
      return state;
  }
};
