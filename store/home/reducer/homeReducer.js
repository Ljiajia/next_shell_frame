import { newsListDetailTypes } from '../homeActions'
const initState = {
    data: '',
}
const newsListDetailReducer = (state = initState, action) => {
    switch (action.type) {
        case newsListDetailTypes.SUCCESS:
            return Object.assign({}, state, {
                data: action.response,
            })
        default:
            return { ...state }
    }
}
export default newsListDetailReducer
