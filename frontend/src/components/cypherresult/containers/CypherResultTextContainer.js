import { connect } from 'react-redux'
import CypherResultText from '../presentations/CypherResultText'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps
    const generateTableData = (data) => {
        let columns = []
        let rows = []
        if (data) {
            columns = data['response']['data']['columns']
            rows = data['response']['data']['rows']
        }
        return { columns: columns, rows: rows }
    }
    return {
        data : generateTableData(state.cypher.queryResult[reqKey])
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultText);
