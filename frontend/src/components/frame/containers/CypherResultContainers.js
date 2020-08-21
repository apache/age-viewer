import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import CypherResultFrame from '../presentations/CypherResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultFrame);
