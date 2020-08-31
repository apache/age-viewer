import {connect} from 'react-redux'
import Alert from '../presentations/Alert'
import {setCommand} from '../../../features/editor/EditorSlice'

const mapStateToProps = (state, ownProps) => {   
    return {
    }
}

const mapDispatchToProps = { setCommand }


export default connect(mapStateToProps, mapDispatchToProps)(Alert);
