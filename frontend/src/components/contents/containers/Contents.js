import {connect} from 'react-redux'
import {addFrame} from '../../../features/frame/FrameSlice'
import {addAlert} from '../../../features/alert/AlertSlice'
import Contents from '../presentations/Contents'
/*
import React from 'react'
import ServerStatusFrame from '../../frame/presentations/ServerStatusFrame'
import ServerConnectFrame from '../../frame/presentations/ServerConnectFrame'
import ServerDisconnectFrame from '../../frame/presentations/ServerDisconnectFrame'
import CypherResultFrame from '../../frame/presentations/CypherResultFrame'
*/

const mapStateToProps = (state)  => {
    return {
        activeMenuName: state.navigator.activeMenu,
        frameList: state.frames,
        alertList: state.alerts,
        database: state.database
    }
}

/*
const mapDispatchToProps = (dispatch) => {
    return {
        addFrame: function(frameList, database, reqString) {
            reqString = reqString.current.value.trim().toLowerCase()
            if (reqString === ':server status') {
                dispatch({type: 'ADD_FRAME', frames : [<ServerStatusFrame serverInfo={database} key={frameList.length}/>, ...frameList]})
            } else if (reqString === ':server connect') {
                dispatch({type: 'ADD_FRAME', frames : [<ServerConnectFrame key={frameList.length}/>, ...frameList]})            
            } else if (reqString === ':server disconnect') {
                dispatch({type: 'ADD_FRAME', frames : [<ServerDisconnectFrame key={frameList.length}/>, ...frameList]})            
            } else if (reqString.startsWith('match')) {
                dispatch({type: 'ADD_FRAME', frames : [<CypherResultFrame key={frameList.length}/>, ...frameList]})      
            } else {
                alert("Can't understand your command")
                return;
            }
            
        }
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onClick: function(reqString) {
            dispatchProps.addFrame(stateProps.frameList, stateProps.database, reqString)
        }
    }
}
*/

const mapDispatchToProps = { addFrame, addAlert }

export default connect(mapStateToProps, mapDispatchToProps)(Contents);

/*
import React, {Component} from 'react'
import store from '../../../app/store';
class ContentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
    } 

    componentDidMount() {
        store.subscribe(function() {
            this.setState({navigator : store.getState().navigator});
        }.bind(this));

        store.subscribe(function() {
            this.setState({frames : store.getState().frames});
        }.bind(this));
    }

    addFrame = (reqString) => {
        reqString = reqString.current.value.trim().toLowerCase()
        if (reqString === ':server status') {
            store.dispatch({type: 'ADD_FRAME', frames : [<ServerStatusFrame serverInfo={this.state.database} key={this.state.frames.length}/>, ...this.state.frames]})
        } else if (reqString === ':server connect') {
            store.dispatch({type: 'ADD_FRAME', frames : [<ServerConnectFrame key={this.state.frames.length}/>, ...this.state.frames]})            
        } else if (reqString === ':server disconnect') {
            store.dispatch({type: 'ADD_FRAME', frames : [<ServerDisconnectFrame key={this.state.frames.length}/>, ...this.state.frames]})            
        } else if (reqString.startsWith('match')) {
            store.dispatch({type: 'ADD_FRAME', frames : [<CypherResultFrame key={this.state.frames.length}/>, ...this.state.frames]})      
        } else {
            alert("Can't understand your command")
            return;
        }
        
    }

    render() {
        return (
            <div id="content" className={this.state.navigator.activeMenu !== "" ? " active " : ""}>
                    <Editor onClick={this.addFrame} />
                    <Frames frameList={this.state.frames} />
            </div>
        );
    }

}

export default ContentsContainer
*/