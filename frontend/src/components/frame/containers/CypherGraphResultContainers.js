import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import CypherGraphResultFrame from '../presentations/CypherGraphResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherGraphResultFrame);
