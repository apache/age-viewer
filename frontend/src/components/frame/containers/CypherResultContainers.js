import {connect} from 'react-redux'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import {removeFrame} from '../../../features/frame/FrameSlice'
import CypherResultFrame from '../presentations/CypherResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { executeCypherQuery, removeFrame }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultFrame);
