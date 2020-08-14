import {connect} from 'react-redux'
import {removeFrame} from '../../../features/frame/FrameSlice'
import CypherMatchResultFrame from '../presentations/CypherMatchResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherMatchResultFrame);
