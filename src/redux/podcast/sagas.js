import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import actions from './actions.js';
import loadingActions from '../loading/actions.js';
import { getJson, getXml } from '../../utils/api.js';
import { getContent, setContent } from '../../utils/storage.js';
import { formatPodcast } from '../../utils/format.js';

const CORS_PROXY = 'https://jsonp.afeld.me/?url=';

function* getPodcastSaga({podcastId}) {
  try {
    yield put(loadingActions.startLoading());
    let detail = getContent(`podcast-${podcastId}`);
    if (!detail) {
      const data = yield call(getJson, `${CORS_PROXY}https://itunes.apple.com/lookup?id=${podcastId}`);
      if (data.resultCount > 0) {
        const dataDetail = data.results[0];
        const podcastRSS = yield call(getXml, `${CORS_PROXY}${dataDetail.feedUrl}`);
        detail = formatPodcast(podcastRSS.rss.channel);
        setContent(`podcast-${podcastId}`, detail);
      } else {
        throw new Error(`No podcast with id ${podcastId} found`);
      }
    }
    yield put({ type: actions.GET_PODCAST_SUCCESS, payload: detail });
    yield put(loadingActions.endLoading());
  } catch (error) {
    yield put({ type: actions.GET_PODCAST_ERROR, error });
    yield put(loadingActions.endLoading());
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
