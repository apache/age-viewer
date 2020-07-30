import {connect} from 'react-redux'
import {removeFrame} from '../../../features/frame/FrameSlice'
import ServerStatusFrame from '../presentations/ServerStatusFrame'

const mapStateToProps = (state) => {
    return {
        serverInfo: state.database
    }
}

const mapDispatchToProps = { removeFrame }

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatusFrame);
