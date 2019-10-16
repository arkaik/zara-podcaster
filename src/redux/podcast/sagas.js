import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import actions from './actions.js';
import { getJson, getXml } from '../../utils/api.js';

/*const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';*/
const CORS_PROXY = 'https://jsonp.afeld.me/?url=';

function* getEpisodesList(url) {
  try {
    const data = yield call(getXml, `${CORS_PROXY}${url}`);
    const episodeList = data.rss.channel.item;
    yield put({ type: actions.GET_EPISODE_LIST_SUCCESS, payload: episodeList, context: data.rss.channel });
    return episodeList;
  } catch (error) {
    yield put({ type: actions.GET_EPISODE_LIST_ERROR, error });
  }
}

function* getPodcastSaga({podcastId}) {
  try {
    const data = yield call(getJson, `${CORS_PROXY}https://itunes.apple.com/lookup?id=${podcastId}`);
    if (data.resultCount > 0) {
      const podcastDetail = data.results[0];
      yield getEpisodesList(podcastDetail.feedUrl);
      yield put({ type: actions.GET_PODCAST_SUCCESS, payload: podcastDetail });
    } else {
      throw new Error(`No podcast with id ${podcastId} found`);
    }
  } catch (error) {
    yield put({ type: actions.GET_PODCAST_ERROR, error });
  }
}

function* getPodcastWatcher() {
  yield takeEvery(actions.GET_PODCAST_REQUEST, getPodcastSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getPodcastWatcher),
  ]);
};
