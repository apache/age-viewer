import {connect} from 'react-redux'
import {disconnectToAgensGraph} from '../../../features/database/DatabaseSlice'
import {addFrame, removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import ServerDisconnectFrame from '../presentations/ServerDisconnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { disconnectToAgensGraph, addFrame, removeFrame, pinFrame, addAlert }

export default connect(mapStateToProps, mapDispatchToProps)(ServerDisconnectFrame);
