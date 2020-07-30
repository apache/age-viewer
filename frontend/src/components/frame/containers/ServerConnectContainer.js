import {connect} from 'react-redux'
import {connectToAgensGraph} from '../../../features/database/DatabaseSlice'
import {addFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import ServerConnectFrame from '../presentations/ServerConnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { connectToAgensGraph, addFrame, addAlert }


export default connect(mapStateToProps, mapDispatchToProps)(ServerConnectFrame);
