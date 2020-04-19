import React from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { getTheme } from '../store/global/globalReducer'
const ThemeContainer = props => {
    return <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
}
const mapStateToProps = state => {
    return {
        theme: getTheme(state),
    }
}
export default connect(
    mapStateToProps,
    null
)(ThemeContainer)
