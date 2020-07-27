import {connect} from 'react-redux'
import ServerStatusFrame from '../presentations/ServerStatusFrame'

const mapStateToProps = (state) => {
    return {
        serverInfo: state.database
    }
}


export default connect(mapStateToProps)(ServerStatusFrame);
