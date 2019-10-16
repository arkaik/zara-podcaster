import actions from './actions.js';

const initialState = {
  list: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_PODCAST_LIST_SUCCESS:
      return { ...state, list: [...action.payload] }
    default:
      return state;
  }
};
