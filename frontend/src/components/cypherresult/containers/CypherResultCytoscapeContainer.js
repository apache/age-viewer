import {connect} from 'react-redux'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import CypherResultFrameContainer from '../presentations/CypherResultCytoscape'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { executeCypherQuery }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultFrameContainer);
