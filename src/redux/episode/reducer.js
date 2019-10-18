import actions from './actions.js';

const initialState = {
  title: '',
  description: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_EPISODE_SUCCESS:
      const episode = action.payload;
      return { ...state, ...episode };

    case actions.CLEAN_EPISODE:
      return initialState;

    default:
      return state;
  }
};
