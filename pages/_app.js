import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import configureStore from '../store/configureStore'
import Router from 'next/router'
import rem from '../utils/rem'
import '../static/empty.css'
import styled from 'styled-components'
import Head from 'next/head'
// import Header from '../components/common/header/Header'
import { version, build, target } from '../package.json'
import ThemeContainer from '../components/ThemeContainer'
import { parseCookie } from '../utils'
import CommonHeader from '../components/common/CommonHeader'
console.log(`环境: ${target} 版本号: ${version} build ${build}`)

if (process.env.NODE_ENV === 'production' && target !== 'dev' && target !== 'beta') {
    const methods = ['log', 'debug', 'warn', 'info']
    for (let i = 0; i < methods.length; i++) {
        console[methods[i]] = function() {}
    }
}

Router.events.on('routeChangeComplete', () => {
    if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]')
        const timestamp = new Date().valueOf()
        els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp
    }
})

const GlobalStyle = createGlobalStyle`
    
    html,body{
        margin:0;
        padding:0;
        font-size:14px;
        width:100%;
        height:100%;
    }
    #__next{
        width:100%;
        height:100%;
    }
    a {
        text-decoration: none;
        color: #999999;
    }
    a:visited {
        color: #999999;
    }
`
const Layout_container = styled.div`
    width: 100%;
    height: 100%;
    @media screen and (max-width: 800px) {
        .header_container {
            height: 1rem;
        }
    }
`
class Layout extends React.Component {
    constructor() {
        super()
        rem()
    }
    render() {
        const { children } = this.props
        return (
            <Layout_container className="layout">
                <CommonHeader />
                {children}
            </Layout_container>
        )
    }
}
class AppContnet extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        let { store, isServer, req, res } = ctx
        if (isServer) {
            let cookie = req.headers.cookie
            let cookieObj = parseCookie(cookie || '')
            let pathLanguage = req.path.match(/en|zh|ja|kor/)
            pathLanguage = pathLanguage && pathLanguage[0]
            const { defaultLanguage } = cookieObj
            if (pathLanguage) {
                let language = pathLanguage
                store.dispatch({
                    type: 'CHANGE_LANGUAGE',
                    payload: { languageStatus: language },
                })
                res.cookie('defaultLanguage', language, { expires: new Date('2099-01-01') })
            }
        }
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props
        return (
            <Container>
                <Head>
                    <title>{'Global Blockchain Consortium'}</title>
                    <link rel="shortcut icon" href={require('../static/images/favicon.ico')} />
                </Head>
                <GlobalStyle />
                <Provider store={store}>
                    <ThemeContainer>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeContainer>
                </Provider>
            </Container>
        )
    }
}

export default withRedux(configureStore)(withReduxSaga(AppContnet))
