import { all } from 'redux-saga/effects';
import episodeSagas from './episode/sagas.js';
import podcastSagas from './podcast/sagas.js';
import podcastListSagas from './podcastList/sagas.js';

export default function* rootSaga() {
  yield all([
    episodeSagas(),
    podcastSagas(),
    podcastListSagas(),
  ]);
}
