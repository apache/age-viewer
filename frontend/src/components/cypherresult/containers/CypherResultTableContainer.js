import {connect} from 'react-redux'
import CypherResultTable from '../presentations/CypherResultTable'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps
    const generateTableData = (data) => {
        let columns = []
        let rows = []
        let command = null
        let rowCount = null
        let message = ''

        if (data && data.command !== 'ERROR') {
            columns = data['columns']
            rows = data['rows'].slice(0, state.setting.maxDataOfTable)
            command = data['command']
            rowCount = data['rowCount']
        } else {
            command = data['command']
            message = data['message']
        }
        return { command : command, rowCount : rowCount, columns: columns, rows: rows, message : message }
    }
    return {
        data : generateTableData(state.cypher.queryResult[refKey])
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
