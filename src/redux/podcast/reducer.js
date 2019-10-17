import actions from './actions.js';
import { formatPodcast, formatEpisode, formatRSSContext } from '../../utils/format.js';

const initialState = {
  episodeList: [],
  summary: 'No description available',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.GET_PODCAST_SUCCESS:
      const podcast = formatPodcast(action.payload);
      return { ...state, ...podcast };

    case actions.GET_EPISODE_LIST_SUCCESS:
      const episodeList = action.payload.map(formatEpisode);
      const context = formatRSSContext(action.context);
      return { ...state, ...context, episodeList };

    default:
      return state;
  }
};
