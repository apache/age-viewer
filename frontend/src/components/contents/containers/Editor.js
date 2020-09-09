import {connect} from 'react-redux'
import {addFrame, trimFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import {getConnectionStatus} from '../../../features/database/DatabaseSlice'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import {setCommand, addCommandHistory} from '../../../features/editor/EditorSlice'

import Editor from '../presentations/Editor'
const mapStateToProps = (state)  => {
    return {
        alertList: state.alerts,
        database: state.database
    }
}


const mapDispatchToProps = { addFrame, trimFrame, addAlert, getConnectionStatus, executeCypherQuery, setCommand, addCommandHistory }

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
