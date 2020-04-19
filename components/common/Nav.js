import React, { Component } from 'react'
import Link from '../../utils/LinkWithLocale'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import SelectLanguage from './SelectLanguage'
import { withTheme } from 'styled-components'
const HomeNavStyleContainer = styled.div`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color: #999999;
    }
    a:visited {
        color: #999999;
    }
    padding-right: 50px;
    @media (max-width: 800px) {
        flex-direction: column;
        padding-right: 0px;
    }
`
const LinkBtn = styled.span`
    color: ${({ theme, active }) => (active ? theme.current.colors.fontColor2 : theme.current.colors.fontColor1)};
    margin-right: 68px;
    font-size: ${({ theme }) => theme.current.fontSize.font14};
    cursor: pointer;
    @media (max-width: 800px) {
        margin: 0;
        height: 1rem;
        line-height: 1rem;
        display: block;
    }
`
const languageIndex = {
    zh: 0,
    ja: 1,
    en: 2,
    kor: 3,
}
class HomeNav extends Component {
    componentDidMount() {
        window.addEventListener('hashchange', this.hashChangeHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.hashChangeHandler)
    }
    hashChangeHandler = () => {
        //刷新高亮
        this.forceUpdate()
    }
    isLinkActive = itemHash => {
        const path = this.props.router.asPath
        const route = this.props.router.route
        const currentHash = typeof window === 'undefined' ? path.split('#')[1] : location.hash.split('#')[1]
        let isActive = route === '/' && (currentHash === itemHash || (!currentHash && itemHash === 'home'))
        return isActive
    }
    render() {
        const { language } = this.props.theme

        const navItems = [
            { title: '首页', hash: 'home' },
            { title: '介绍', hash: 'intro' },
            { title: '关于', hash: 'baout' },
        ]
        const languages = [
            { label: '简体中文', icon: require('../../static/images/guoqi_zg@3x.png'), minSpell: 'zh' },
            { label: '日本語', icon: require('../../static/images/guoqi_rb@3x.png'), minSpell: 'ja' },
            { label: 'English', icon: require('../../static/images/guoqi_yg@3x.png'), minSpell: 'en' },
            { label: '한국어', icon: require('../../static/images/guoqi_hg@3x.png'), minSpell: 'kor' },
        ]
        const selectedOption = languages[languageIndex[language.minSpell] || 0]
        return (
            <HomeNavStyleContainer>
                {typeof window !== 'undefined'
                    ? navItems.map(item => {
                          return (
                              <Link key={item.hash} href={'/#' + item.hash}>
                                  <LinkBtn
                                      active={this.isLinkActive(item.hash)}
                                      onClick={() => {
                                          const { router } = this.props
                                          this.props.onHashSelect && this.props.onHashSelect(item.hash)
                                          if (router.route !== '/') {
                                              return
                                          }
                                          location.hash = item.hash
                                          //   this.props.onHashSelect && this.props.onHashSelect(item.hash)
                                      }}>
                                      {item.title}
                                  </LinkBtn>
                              </Link>
                          )
                      })
                    : null}
                <SelectLanguage
                    options={languages}
                    selectedOption={selectedOption}
                    onChange={item => {
                        location.href = '/' + item.minSpell + this.props.router.route + location.search + location.hash
                        this.props.onLanguageSelect && this.props.onLanguageSelect(item)
                    }}></SelectLanguage>
            </HomeNavStyleContainer>
        )
    }
}
export default withTheme(withRouter(HomeNav))
