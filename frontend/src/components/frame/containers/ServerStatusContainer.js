import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import ServerStatusFrame from '../presentations/ServerStatusFrame'

const mapStateToProps = (state) => {
    return {
        serverInfo: state.database
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatusFrame);
