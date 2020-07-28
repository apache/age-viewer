import {connect} from 'react-redux'
import {connectToAgensGraph} from '../../../features/database/DatabaseSlice'
import ServerConnectFrame from '../presentations/ServerConnectFrame'
import Editor from '../../contents/presentations/Editor'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { connectToAgensGraph }


export default connect(mapStateToProps, mapDispatchToProps)(ServerConnectFrame, Editor);
