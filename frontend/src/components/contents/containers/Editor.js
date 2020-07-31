import {connect} from 'react-redux'
import {addFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import {getConnectionStatus} from '../../../features/database/DatabaseSlice'
import Editor from '../presentations/Editor'
const mapStateToProps = (state)  => {
    return {
        alertList: state.alerts,
        database: state.database
    }
}


const mapDispatchToProps = { addFrame, addAlert, getConnectionStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
