import { takeEvery, call, put } from 'redux-saga/effects'
import { NEWS_LIST_DETAIL } from '../homeActionTypes'
import { newsListDetailRequestAction } from '../homeActions'
import { api } from '../../../api/api'
function* newsListDetailFn(action) {
    try {
        yield put(newsListDetailRequestAction.request())
        const response = yield call(api.newsList, action.payload)
        const { data, success } = response.data
        if (success) {
            yield put(newsListDetailRequestAction.success(data))
        } else {
            // yield put(newsListDetailRequestAction.failure(data.errCode))
        }
    } catch (e) {
        console.log(e, 'err...')
    }
}
export default function* newsListDetailSaga() {
    yield takeEvery(NEWS_LIST_DETAIL, newsListDetailFn)
}
