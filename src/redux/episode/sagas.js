import { all, fork, put, takeEvery, call, select, delay } from 'redux-saga/effects';
import actions from './actions.js';
import { getPodcastSaga } from '../podcast/sagas.js';
import podcastActions from '../podcast/actions.js';
import loadingActions from '../loading/actions.js';

export function* getEpisodeSaga({ podcastId, episodeId }) {
  try {
    yield put(loadingActions.startLoading());
    yield call(getPodcastSaga, { podcastId });
    const list = yield select(({ Podcast }) => Podcast.episodeList);
    const listId = list.length - episodeId;
    const episode = list[listId] || undefined;
    if (!episode) {
      throw new Error("The chosen episode was not found");
    }
    yield put({ type: actions.GET_EPISODE_SUCCESS, payload: episode });
    yield delay(200);
    yield put(loadingActions.endLoading());
  } catch (error) {
    console.error(error);
    yield put({ type: actions.GET_EPISODE_ERROR, error });
    yield delay(200);
    yield put(loadingActions.endLoading());
  }
}

function* getEpisodeWatcher() {
  yield takeEvery(actions.GET_EPISODE_REQUEST, getEpisodeSaga);
}

export function* cleanEpisodeSaga() {
  yield put(loadingActions.startLoading());
  yield put(podcastActions.cleanPodcast());
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
