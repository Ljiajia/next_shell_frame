import axios from 'axios'
import Qs from 'query-string'
import { HTTP_BASE } from './apiAddress'
// import { showLoading, hideLoading } from './Tool'

const TIMEOUT = 10 * 1000
const RETRY_MAX_COUNT = 3
const RETRY_DELAY = 1000
axios.defaults.retry = RETRY_MAX_COUNT
axios.defaults.retryDelay = RETRY_DELAY

axios.interceptors.response.use(
    async function axiosResponseInterceptor(response) {
        return Promise.resolve(response)
    },
    function axiosRetryInterceptor(err) {
        if (global.testTime) {
            global.testTime = new Date().getTime()
        }
        const config = err.config

        if (!config || !config.retry) return Promise.resolve({})

        config._retryCount = config._retryCount || 0
        if (config._retryCount >= config.retry) {
            return Promise.reject(err)
        }

        config._retryCount += 1
        const backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve()
            }, config.retryDelay || 1)
        })

        return backoff.then(function() {
            return axios(config)
        })
    }
)
const restAPI_Headers = {
    'Content-Type': 'application/json',
}
const basicRequest = (config = {}) => {
    const request = axios.request({
        baseURL: HTTP_BASE,
        timeout: TIMEOUT,
        paramsSerializer: params => Qs.stringify(params),
        validateStatus: function(status) {
            return status >= 200 && status <= 501
        },
        ...config,
        headers: {
            request_client_type: '1',
            ...config.headers,
        },
    })

    return request
}

const restAPI_Default = async (config = {}) => {
    // showLoading();
    const request = basicRequest(config)
    try {
        const result = await request
        // hideLoading()
        return Promise.resolve(result)
    } catch (error) {
        // hideLoading()
        return Promise.resolve({
            data: {
                success: false,
                data: {
                    errCode: error.message || 'NetError',
                    error: error.message || 'NetError',
                },
            },
        })
    }
}

const restAPI_GET = restAPI_Default

const restAPI_POST = (config = {}) =>
    restAPI_Default({
        method: 'POST',
        headers: restAPI_Headers,
        ...config,
    })

export { restAPI_GET, restAPI_POST }
