import { connect } from 'react-redux'
import CypherResultText from '../presentations/CypherResultText'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps
    const generateTableData = (data) => {
        let columns = []
        let rows = []
        if (data) {
            columns = data['columns']
            rows = data['rows']
        }
        return { columns: columns, rows: rows }
    }
    return {
        data : generateTableData(state.cypher.queryResult[refKey])
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultText);
