import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { newlists } from '../../store/home/homeActions'
const HomePageStyleContainer = styled.div`
    height: 100vh;
    width: 100vw;
    .container_swiper {
        width: 100%;
        height: 100%;
    }
    .home_wrapper {
        width: 100%;
        height: 100%;
    }
    .home_item {
        width: 100%;
        height: 100%;
    }
`
class HomePage extends Component {
    componentDidMount() {
        this.props.getData({ langId: 'zh', pageSize: 12, pageIndex: 1 })
    }
    render() {
        return <HomePageStyleContainer>wellcome</HomePageStyleContainer>
    }
}

const mapStateToProps = state => {
    return {
        data: state.newsListDetailReducer.newsListDetailReducer.data,
    }
}
const mapDispatchProps = dispatch => ({
    getData: params => dispatch(newlists(params)),
})
export default connect(
    mapStateToProps,
    mapDispatchProps
)(HomePage)
