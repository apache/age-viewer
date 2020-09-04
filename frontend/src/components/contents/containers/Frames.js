import {connect} from 'react-redux'
import Frames from '../presentations/Frames'
import {addFrame} from '../../../features/frame/FrameSlice'
const mapStateToProps = (state)  => {
    return {
        frameList: state.frames,
        queryResult : state.cypher.queryResult,
        database: state.database
    }
}

const mapDispatchToProps = { addFrame }

export default connect(mapStateToProps, mapDispatchToProps)(Frames);
