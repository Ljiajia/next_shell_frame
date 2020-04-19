import HomePage from '../components/home/Home'
import { connect } from 'react-redux'
import { getTheme } from '../store/global/globalReducer'
const mapStateToProps = state => {
    return {
        language: getTheme(state).language,
    }
}
const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)
