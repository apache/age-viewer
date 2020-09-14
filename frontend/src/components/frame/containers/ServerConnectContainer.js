import {connect} from 'react-redux'
import {connectToAgensGraph} from '../../../features/database/DatabaseSlice'
import {getMetaData, getMetaChartData} from '../../../features/database/MetadataSlice'
import {addFrame, trimFrame, removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import ServerConnectFrame from '../presentations/ServerConnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { connectToAgensGraph, addFrame, trimFrame, removeFrame, pinFrame, addAlert, getMetaData, getMetaChartData }


export default connect(mapStateToProps, mapDispatchToProps)(ServerConnectFrame);
