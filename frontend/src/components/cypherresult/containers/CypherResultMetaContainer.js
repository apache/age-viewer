import { connect } from 'react-redux'
import CypherResultMeta from '../presentations/CypherResultMeta'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    let database = {}
    let query = ''
    let data = {}
    if (state.cypher.queryResult[refKey]) {
        database = state.database
        query = state.cypher.queryResult[refKey].query
        data = {columns : state.cypher.queryResult[refKey].columns
            , command : state.cypher.queryResult[refKey].command
            , rowCount : state.cypher.queryResult[refKey].rowCount
            , rows : state.cypher.queryResult[refKey].rows
        }
    }

    return {
        database: database,
        query: query,
        data: data
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultMeta);
