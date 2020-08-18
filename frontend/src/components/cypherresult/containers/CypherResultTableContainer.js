import {connect} from 'react-redux'
import CypherResultTable from '../presentations/CypherResultTable'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps
    const generateTableData = (data) => {
        console.log(">>>>>>>>>>>>> ", data)
        let columns = []
        let rows = []
        let command = null
        let rowCount = null
        if (data) {
            columns = data['columns']
            rows = data['rows']
            command = data['command']
            rowCount = data['rowCount']
        }
        return { command : command, rowCount : rowCount, columns: columns, rows: rows }
    }
    return {
        data : generateTableData(state.cypher.queryResult[refKey])
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
