const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
/**
 *
 * @param {string} base: eg. 'SEARCH_ADDRESS'
 * @returns {object}
 *
 */
export function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[`${type}`] = `${base}_${type}`
        return acc
    }, {})
}
{
    REQUEST: 'TEST_REQUEST'
}
/**
 * @param {object} types
 * @returns {Object}
 */

export function createRequestActions(types) {
    return {
        request: payload => {
            return { type: types.REQUEST, payload }
        },
        success: response => {
            return { type: types.SUCCESS, response }
        },
        failure: error => {
            return { type: types.FAILURE, error }
        },
    }
}
