import { all, fork } from 'redux-saga/effects'
import newsListDetailSaga from './homeSaga'
export default function* newsListDetail() {
    yield all([fork(newsListDetailSaga)])
}
