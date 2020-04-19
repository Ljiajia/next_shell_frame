// export const LOGOUT_EXT = 'LOGOUT_EXT'

import { combineReducers } from 'redux'
import globalData from './global/globalReducer'
import homeData from './home/reducer'
import newsListDetailReducer from './home/reducer'
const appReducer = combineReducers({
    globalData,
    homeData,
    newsListDetailReducer,
})

const rootReducer = (state, action) => {
    // if (action.type === LOGOUT_EXT) {
    //     localStorage.clear()
    //     state = undefined
    // }

    return appReducer(state, action)
}

export default rootReducer
