import {connect} from 'react-redux'
import CypherResultTable from '../presentations/CypherResultTable'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps
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
        data : generateTableData(state.cypher.queryResult[refKey])
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
