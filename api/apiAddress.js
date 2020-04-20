import { target } from '../package.json'
//dev
const DEV = 'https://.........com' 
// dawn
const DAWN = 'https://.......team' 

//chainBrowerSSET
let HTTPS
switch (target) {
    case 'dev':
        HTTPS = DEV
        break 
    case 'dawn':
        HTTPS = DAWN
        break 
}

const HTTP_BASE = HTTPS

const HOME_BANNER = '/v1/home/banner'

const NEWS_LIST = '/v1/home/news/list'

export { HTTP_BASE, HOME_BANNER, NEWS_LIST }
