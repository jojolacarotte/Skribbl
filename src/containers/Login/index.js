import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Login from '../../components/Login'
import * as PlayerActions from '../../actions'

const mapStateToProps = (state) => ({
	play: state,
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(PlayerActions, dispatch),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login)
