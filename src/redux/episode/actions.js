const actions = {
  GET_EPISODE_REQUEST: 'GET_EPISODE_REQUEST',
  GET_EPISODE_SUCCESS: 'GET_EPISODE_SUCCESS',
  GET_EPISODE_ERROR: 'GET_EPISODE_ERROR',

  getEpisode: (podcastId, episodeId) => ({
    type: actions.GET_EPISODE_REQUEST,
    podcastId, episodeId
  }),

  CLEAN_EPISODE: 'CLEAN_EPISODE',

  cleanEpisode: () => ({
    type: actions.CLEAN_EPISODE,
  }),
};

export default actions;
