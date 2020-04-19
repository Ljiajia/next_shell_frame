/* eslint-disable */
const lessToJS = require('less-vars-to-js')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')
const withLess = require('@zeit/next-less')

const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
// const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './static/antd-custom.less'), 'utf8'))

if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {}
}
// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

module.exports = withLess({
    // target: 'serverless',
    lessLoaderOptions: {
        javascriptEnabled: true,
        // modifyVars: themeVariables,
        localIdentName: '[local]___[hash:base64:5]',
    },
    webpack: (config, ...args) => {
        config = withCss().webpack(config, ...args)
        config = withImages().webpack(config, ...args)
        // console.log(config.module.rules[1].use[config.module.rules[1].use.length-1].options.modifyVars)
        return config
    },
})
