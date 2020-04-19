import { all, fork } from 'redux-saga/effects'
import homeSage from './home/saga'
export default function* rootSaga() {
    yield all([fork(homeSage)])
}
