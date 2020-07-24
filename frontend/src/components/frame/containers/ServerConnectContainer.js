import {connect} from 'react-redux'
import {connectToAgensGraph} from '../../../features/database/DatabaseSlice'
import ServerConnectFrame from '../presentations/ServerConnectFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { connectToAgensGraph }


export default connect(mapStateToProps, mapDispatchToProps)(ServerConnectFrame);
