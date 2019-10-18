import { all, fork, call, put, takeEvery, delay } from 'redux-saga/effects';
import actions from './actions.js';
import loadingActions from '../loading/actions.js';
import { getJson } from '../../utils/api.js';
import { getContent, setContent } from '../../utils/storage.js';
import { formatPodcastItem } from '../../utils/format.js';

function* getPodcastListSaga(action) {
  try {
    yield put(loadingActions.startLoading());
    let list = getContent('podcastList');
    if (!list) {
      const data = yield call(getJson, 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      list = data.feed.entry.map(formatPodcastItem);
      setContent('podcastList', list);
    }
    yield put({ type: actions.GET_PODCAST_LIST_SUCCESS, payload: list });
    yield delay(200);
    yield put(loadingActions.endLoading());
  } catch (error) {
    console.error(error);
    yield put({ type: actions.GET_PODCAST_LIST_ERROR, error });
    yield delay(200);
    yield put(loadingActions.endLoading());
  }
}

function* getPodcastListWatcher() {
  yield takeEvery(actions.GET_PODCAST_LIST_REQUEST, getPodcastListSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getPodcastListWatcher),
  ]);
};
