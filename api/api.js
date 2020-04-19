import { HOME_BANNER, NEWS_LIST } from './apiAddress'
import { restAPI_GET, restAPI_POST } from './networkingUtils'

const api = {
    /**
     *@param {string} langId
     */
    homeBanner: params => {
        return restAPI_GET({
            url: HOME_BANNER,
            params: { ...params },
        })
    },
    newsList: params => {
        return restAPI_GET({
            url: NEWS_LIST,
            params: { ...params },
        })
    },
}

export { api }
