import {connect} from 'react-redux'
import Frames from '../presentations/Frames'
const mapStateToProps = (state)  => {
    return {
        frameList: state.frames,
        queryResult : state.cypher.queryResult,
        database: state.database
    }
}

const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(Frames);
