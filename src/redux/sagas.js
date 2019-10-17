import { all } from 'redux-saga/effects';
import podcastSagas from './podcast/sagas.js';
import podcastListSagas from './podcastList/sagas.js';

export default function* rootSaga() {
  yield all([
    podcastSagas(),
    podcastListSagas(),
  ]);
}
