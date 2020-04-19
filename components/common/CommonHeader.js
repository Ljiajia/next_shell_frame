import React, { Component } from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import MediaQuery from 'react-responsive'
const HeaderStyleContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: pink;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 800px) {
        background: #000000;
    }
    .settings {
        height: 0.3rem;
        width: 0.46rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
            height: 0.035rem;
            width: 100%;
            background: #ffffff;
        }
        margin-right: 0.4rem;
    }
    .mobile_swipe_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        transition: transform 0.5s;
        background: #18191c;
        z-index: -1;
        transform: translate(0, -150%);
        margin-top: 1rem;
    }
    .mobile_swipe_wrapper.open {
        transform: translate(0, 0);
    }
`
const LogoContainer = styled.div`
    background-size: 100% auto;
    width: 100px;
    height: 40px;
    margin-left: 50px;
    @media (max-width: 800px) {
        margin-left: 0.4rem;
        width: 1.2rem;
        height: 0.5rem;
    }
`
export default class Header extends Component {
    state = {
        showMobileNav: false,
    }
    render() {
        const { showMobileNav } = this.state
        return (
            <HeaderStyleContainer className="header_container">
                <LogoContainer />
                <MediaQuery query="(min-width:800px)">
                    <Nav />
                </MediaQuery>
                <MediaQuery query="(max-width:800px)">
                    <div
                        className={`settings ${showMobileNav ? 'active' : ''}`}
                        onClick={() => this.setState({ showMobileNav: !showMobileNav })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`mobile_swipe_wrapper ${showMobileNav ? 'open' : ''}`}>
                        <Nav
                            onLanguageSelect={() => {
                                this.setState({ showMobileNav: false })
                            }}
                            onHashSelect={() => {
                                this.setState({ showMobileNav: false })
                            }}
                        />
                    </div>
                </MediaQuery>
            </HeaderStyleContainer>
        )
    }
}
