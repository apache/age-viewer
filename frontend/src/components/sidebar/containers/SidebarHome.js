import {connect} from 'react-redux'
import SidebarHome from '../presentations/SidebarHome'
import {setCommand} from '../../../features/editor/EditorSlice'

const mapStateToProps = (state) => {
    return {
        edges : state.metadata.edges,
        nodes : state.metadata.nodes,
        propertyKeys : state.metadata.propertyKeys,
        dbname: state.metadata.dbname,
        graph: state.metadata.graph,
        role: state.metadata.role

    }
}

const mapDispatchToProps = { setCommand }

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHome);
