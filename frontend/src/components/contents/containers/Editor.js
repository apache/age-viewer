import {connect} from 'react-redux'
import {addFrame, trimFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import {getConnectionStatus} from '../../../features/database/DatabaseSlice'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import Editor from '../presentations/Editor'
const mapStateToProps = (state)  => {
    return {
        alertList: state.alerts,
        database: state.database,
        query: state.query.queryStr
    }
}


const mapDispatchToProps = { addFrame, trimFrame, addAlert, getConnectionStatus, executeCypherQuery }

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
