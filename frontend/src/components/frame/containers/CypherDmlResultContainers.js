import {connect} from 'react-redux'
import {removeFrame} from '../../../features/frame/FrameSlice'
import CypherDmlResultFrame from '../presentations/CypherDmlResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherDmlResultFrame);
