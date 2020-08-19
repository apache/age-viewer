import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import CypherMatchResultFrame from '../presentations/CypherMatchResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherMatchResultFrame);
