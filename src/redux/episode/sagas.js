import { all, fork, put, takeEvery, select, delay } from 'redux-saga/effects';
import actions from './actions.js';
import loadingActions from '../loading/actions.js';

function* getEpisodeSaga({ episodeId }) {
  try {
    yield put(loadingActions.startLoading());
    const list = yield select(({ Podcast }) => Podcast.episodeList);
    const listId = list.length - episodeId;
    const episode = list[listId] || {};
    yield put({ type: actions.GET_EPISODE_SUCCESS, payload: episode });
    yield delay(200);
    yield put(loadingActions.endLoading());
  } catch (error) {
    yield put({ type: actions.GET_EPISODE_ERROR, error });
    yield delay(200);
    yield put(loadingActions.endLoading());
  }
}

function* getEpisodeWatcher() {
  yield takeEvery(actions.GET_EPISODE_REQUEST, getEpisodeSaga);
}

function* cleanEpisodeSaga() {
  yield put(loadingActions.startLoading());
  yield delay(200);
  yield put(loadingActions.endLoading());
}

function* cleanEpisodeWatcher() {
  yield takeEvery(actions.CLEAN_EPISODE, cleanEpisodeSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getEpisodeWatcher),
    fork(cleanEpisodeWatcher),
  ]);
};
