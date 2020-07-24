import {connect} from 'react-redux'
import {disconnectToAgensGraph} from '../../../features/database/DatabaseSlice'
import ServerDisconnectFrame from '../presentations/ServerDisconnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { disconnectToAgensGraph }

export default connect(mapStateToProps, mapDispatchToProps)(ServerDisconnectFrame);
