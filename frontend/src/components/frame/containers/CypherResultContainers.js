import {connect} from 'react-redux'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import CypherResultFrame from '../presentations/CypherResultFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { executeCypherQuery }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultFrame);
