import {connect} from 'react-redux'
import CodeMirrorWapper from '../presentations/CodeMirrorWapper'

const mapStateToProps = (state, ownProps)  => {

    return {
        reqString : state.editor.reqString,
        commandHistroy : state.editor.commandHistroy.slice(Math.max(state.editor.commandHistroy.length - state.setting.maxNumOfHistories, 1))
    }
}


const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirrorWapper);
