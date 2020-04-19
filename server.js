const parseCookie = (cookieStr = '') => {
    let cookieObj = {}
    cookieStr.split('; ').forEach(item => {
        let itemArr = item.split('=')
        cookieObj[itemArr[0]] = itemArr[1]
    })
    return cookieObj
}
const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.get('*', (req, res) => {
            console.log(req.path)
            if (!/^\/_next/.test(req.path)) {
                if (!/^\/(en|zh|ja|kor)/.test(req.path)) {
                    let cookie = req.headers.cookie
                    let cookieObj = parseCookie(cookie || '')
                    let { defaultLanguage } = cookieObj
                    defaultLanguage = defaultLanguage || 'en'
                    res.redirect(301, '/' + defaultLanguage + req.path)
                    return false
                } else {
                    var realPath = req.path.replace(/^\/(en|zh|ja|kor)/, '')
                    if (realPath === '') {
                        realPath = '/'
                    }
                    app.render(req, res, realPath)
                    return false
                }
            }

            return handle(req, res)
        })

        server.listen(3000, err => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch(ex => {
        console.error(ex.stack)
        process.exit(1)
    })
