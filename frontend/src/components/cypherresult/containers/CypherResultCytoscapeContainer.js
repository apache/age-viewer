import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'
import { generateCytoscapeElement, labelColors, getCurrentLabelColor } from '../../../features/cypher/CypherUtil'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    return {
        data: generateCytoscapeElement(state.cypher.queryResult[refKey]),
        isActive: state.navigator.isActive
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
