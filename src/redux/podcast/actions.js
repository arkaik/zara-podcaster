const actions = {
  GET_PODCAST_REQUEST: 'GET_PODCAST_REQUEST',
  GET_PODCAST_SUCCESS: 'GET_PODCAST_SUCCESS',
  GET_PODCAST_ERROR: 'GET_PODCAST_ERROR',

  getPodcast: (id) => ({
    type: actions.GET_PODCAST_REQUEST,
    podcastId: id
  }),

  CLEAN_PODCAST: 'CLEAN_PODCAST',

  cleanPodcast: () => ({
    type: actions.CLEAN_PODCAST,
  }),
};

export default actions;
