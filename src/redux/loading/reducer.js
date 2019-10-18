import actions from './actions.js';

const initialState = {
  active: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.START_LOADING:
      return { active: true };

    case actions.END_LOADING:
      return { active: false };

    default:
      return state;
  }
};
