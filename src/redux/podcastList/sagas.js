import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import actions from './actions.js';
import { getJson } from '../../utils/api.js';

function* getPodcastListSaga(action) {
  try {
    const data = yield call(getJson, 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    yield put({ type: actions.GET_PODCAST_LIST_SUCCESS, payload: data.feed.entry });
  } catch (error) {
    yield put({ type: actions.GET_PODCAST_LIST_ERROR, error });
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
