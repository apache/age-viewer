import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'
import { generateCytoscapeElement, labelColors } from '../../../features/cypher/CypherUtil'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    return {
        data: generateCytoscapeElement(state.cypher.queryResult[refKey]),
        isActive: state.navigator.isActive,
        labelColors: labelColors
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
