import React, { Component } from 'react'
import styled from 'styled-components'
const DropDownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    img {
        height: 10px;
        width: 14px;
        margin-left: 10px;
        margin-right: 10px;
    }
    overflow: hidden;
    .title {
        height: 60px;
        font-size: 14px;
        color: #999999;
        cursor: pointer;
        padding-right: 40px;
        display: flex;
        align-items: center;
        .arrow {
            position: absolute;
            top: 50%;
            right: 10px;
            margin-top: 2.5px;
            transform: translate(0, -50%) rotate(0deg);
            transition: all 0.5s;
            border-top: 5px solid #999999;
            border-left: 5px solid rgba(0, 0, 0, 0);
            border-right: 5px solid rgba(0, 0, 0, 0);
            border-bottom: 5px solid rgba(0, 0, 0, 0);
            height: 0;
            width: 0;
            transform-origin: 50% 25%;
        }
    }

    .dropdown_list {
        position: absolute;
        top: 100%;
        left: 0;
        height: 0;
        transition: opacity 0.5s;
        background: #262727;
        font-family: PingFangSC-Regular;
        font-size: 0px;
        color: #7a7a7a;
        line-height: 0px;
        opacity: 0;
        width: 100%;
        .dropdown_list_item {
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 40px;
        }
        .dropdown_list_item.active {
            background: #1c1c1c;
            color: #ffffff;
        }
        .dropdown_list_item:hover {
            background: #1c1c1c;
            color: #ffffff;
        }
    }
    &:hover {
        .dropdown_list {
            height: auto;
            font-size: 14px;
            color: #7a7a7a;
            line-height: 14px;
            opacity: 1;
        }
        overflow: visible;
        .title {
            color: #f25a02;
        }
        .arrow {
            transform: translate(0, -50%) rotate(180deg);
            border-top-color: #f25a02;
        }
    }
`
export default class SelectLanguage extends Component {
    static defaultProps = {
        titleRender: currentOption => {
            return (
                <>
                    <img src={currentOption.icon} />
                    <span>{currentOption.label}</span>
                </>
            )
        },
        renderOption: (item, currentOption) => {
            return (
                <>
                    <img src={item.icon} />
                    <span>{item.label}</span>
                </>
            )
        },
        onChange: () => {},
        options: [],
        selectedOption: null,
    }
    state = {
        selectedOption: {},
        showDropdown: false,
    }
    render() {
        const { options, selectedOption } = this.props
        const { showDropdown } = this.state
        const currentOption = selectedOption || this.state.selectedOption
        return (
            <DropDownContainer>
                <div>
                    <div className="title">
                        {this.props.titleRender(currentOption)}
                        <span className="arrow"></span>
                    </div>
                </div>
                <div className={`dropdown_list ${showDropdown ? 'dropdown_show' : ''}`}>
                    {options.map((item, index) => {
                        const isActive = item.label === currentOption.label
                        return (
                            <div
                                className={`dropdown_list_item ${isActive ? 'active' : ''}`}
                                key={index}
                                onClick={e => {
                                    this.setState({ selectedOption: item })
                                    this.props.onChange && this.props.onChange(item, e)
                                }}>
                                {this.props.renderOption(item, currentOption)}
                            </div>
                        )
                    })}
                </div>
            </DropDownContainer>
        )
    }
}
