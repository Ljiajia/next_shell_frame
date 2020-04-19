import { handleActions } from 'redux-actions'
import zh from '../../utils/language/zh.json'
import ja from '../../utils/language/ja.json'
import en from '../../utils/language/en.json'
import kor from '../../utils/language/kor.json'
import theme from '../../theme/index'
import { createSelector } from 'reselect'
const language = {
    zh,
    ja,
    en,
    kor,
}

const initState = {
    languageStatus: 'zh',
}

export default handleActions(
    {
        ['CHANGE_LANGUAGE']: (state, action) => {
            return {
                languageStatus: action.payload.languageStatus,
            }
        },
    },
    initState
)

const getLanguage = state => {
    return state.globalData.languageStatus
}
export const getTheme = createSelector(
    [getLanguage],
    languageStatus => {
        return {
            language: language[languageStatus],
            current: theme.dark,
        }
    }
)
