import zh from './language/zh.json'
import ja from './language/ja.json'
import en from './language/en.json'
import kor from './language/kor.json'
const languages = {
    zh,
    ja,
    en,
    kor,
}
export const parseCookie = (cookieStr = '') => {
    let cookieObj = {}
    cookieStr.split('; ').forEach(item => {
        let itemArr = item.split('=')
        cookieObj[itemArr[0]] = itemArr[1]
    })
    return cookieObj
}

export const requestAll = (promiseList = []) => {
    let resultList = new Array(promiseList.length)
    resultList.fill(null, 0, resultList.length)
    return new Promise(resolve => {
        if (!promiseList.length) {
            resolve(resultList)
            return false
        }
        promiseList.forEach((item, index) => {
            item.then(result => {
                resultList[index] = result
            })
                .catch(error => {
                    resultList[index] = { data: { success: false } }
                })
                .finally(() => {
                    if (resultList.indexOf(null) < 0) {
                        resolve(resultList)
                    }
                })
        })
    })
}

export const getLanguageObj = minSpell => {
    return languages[minSpell] || kor
}
const xssOpt = {
    whiteList: {
        style: [],
        p: ['style'],
        ul: ['style'],
        li: ['style'],
        br: ['style'],
        code: ['style'],
        span: ['style'],
        img: ['src'],
        div: ['style'],
        h1: ['style'],
        h2: ['style'],
        h3: ['style'],
        h4: ['style'],
        h5: ['style'],
        h6: ['style'],
        // img:
    },
}
// export const xss = string => baseXss(string, xssOpt)
//暂时去掉过滤 因为后台用的富文本编辑器有奇怪的标签出现
export const xss = string => string
