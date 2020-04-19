const resetRem = () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
}
export default () => {
    if (typeof window !== 'object') {
        return false
    }
    resetRem()
    window.addEventListener('resize', resetRem)
    window.addEventListener('pageshow', resetRem)
}
