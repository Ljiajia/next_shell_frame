import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { withTheme } from 'styled-components'
class LinkWithLocale extends React.Component {
    render() {
        let lang = this.props.theme.language.minSpell
        let href = this.props.href
        return (
            <Link href={href} as={'/' + lang + href}>
                {this.props.children}
            </Link>
        )
    }
}
class NormalWithLocale extends React.Component {
    render() {
        let lang = this.props.theme.language.minSpell
        let href = this.props.href
        return <a href={'/' + lang + href}>{this.props.children}</a>
    }
}
export const AWithLocale = withTheme(NormalWithLocale)
export const routerPushWithLocale = path => {
    try {
        let lang = getLanguageObj().minSpell
        Router.push(path, '/' + lang + path)
    } catch (e) {}
}
export default withTheme(LinkWithLocale)
