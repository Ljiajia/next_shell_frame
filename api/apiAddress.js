import { target } from '../package.json'
//dev
const DEV = 'https://beta-newscms.valicn.com'
//beta
const BETA = 'https://beta-newscms.valicn.com'
// dawn
const DAWN = 'https://api-cms.gbc.team'
//release
const RELEASE = 'https://api-cms.gbc.team'

//chainBrowerSSET
let HTTPS
switch (target) {
    case 'dev':
        HTTPS = DEV
        break
    case 'beta':
        HTTPS = BETA
        break
    case 'dawn':
        HTTPS = DAWN
        break
    case 'release':
        HTTPS = RELEASE
        break
}

const HTTP_BASE = HTTPS

const HOME_BANNER = '/v1/home/banner'

const NEWS_LIST = '/v1/home/news/list'

export { HTTP_BASE, HOME_BANNER, NEWS_LIST }
