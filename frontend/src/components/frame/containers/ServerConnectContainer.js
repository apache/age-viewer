import {connect} from 'react-redux'
import {connectToAgensGraph} from '../../../features/database/DatabaseSlice'
import {getMetaData} from '../../../features/database/MetadataSlice'
import {removeFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import ServerConnectFrame from '../presentations/ServerConnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { connectToAgensGraph, removeFrame, addAlert, getMetaData }


export default connect(mapStateToProps, mapDispatchToProps)(ServerConnectFrame);
