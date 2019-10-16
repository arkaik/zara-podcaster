const actions = {
  GET_EPISODE_REQUEST: 'GET_EPISODE_REQUEST',
  GET_EPISODE_SUCCESS: 'GET_EPISODE_SUCCESS',
  GET_EPISODE_ERROR: 'GET_EPISODE_ERROR',

  getEpisode: () => ({
    type: actions.GET_EPISODE_REQUEST
  }),
};

export default actions;
