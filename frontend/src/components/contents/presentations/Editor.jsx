import React, {useRef}  from 'react';
import {useDispatch} from 'react-redux'
import AlertContainers from '../../alert/containers/AlertContainers'
import uuid from 'react-uuid'


const Editor = ({ addFrame, trimFrame, addAlert, alertList, database, executeCypherQuery }) => {

    const dispatch = useDispatch();
    let reqString = useRef()

    const clearReqString = () => (reqString.current.value = '' );
    
    const onEnter = (e) => {
        if(e.keyCode === 13){
            onClick()
         }
    }
    
    const onClick = () => {
        const refKey = uuid()
        if (reqString.current.value === ':server status') {
            dispatch(() => trimFrame('ServerStatus'))
            dispatch(() => addFrame(reqString.current.value))
        } else if (database.status === 'disconnected' && reqString.current.value === ':server disconnect') {
            dispatch(() => trimFrame('ServerDisconnect'))
            dispatch(() => trimFrame('ServerConnect'))
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            dispatch(() => addFrame(reqString.current.value))
        } else if (database.status === 'disconnected' && reqString.current.value === ':server connect') {
            dispatch(() => trimFrame('ServerConnect'))
            dispatch(() => addFrame(reqString.current.value))
        } else if (database.status === 'disconnected' && reqString.current.value.match('(match|create).*')) {
            dispatch(() => trimFrame('ServerConnect'))
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            dispatch(() => addFrame(':server connect'))
        } else if (database.status === 'connected' && reqString.current.value === ':server disconnect') {
            dispatch(() => trimFrame('ServerDisconnect'))
            dispatch(() => addAlert('NoticeServerDisconnected'))
            dispatch(() => addFrame(':server disconnect'))
        } else if (database.status === 'connected' && reqString.current.value === ':server connect') {
            dispatch(() => trimFrame('ServerStatus'))
            dispatch(() => addAlert('NoticeAlreadyConnected'))
            dispatch(() => addFrame(':server status'))
        } else if (database.status === 'connected' && reqString.current.value.match('(match|create).*')) {
            const reqStringValue = reqString.current.value
            dispatch(() => executeCypherQuery([refKey, reqStringValue]).then((response) => {
                if (response.type === 'cypher/executeCypherQuery/fulfilled'){
                    addFrame(reqStringValue, refKey)
                }                
            }))      
        } else {
            alert("Sorry, I Can't understand your command")
        }
        clearReqString()
    }; 

    const alerts = alertList.map((alert) => {
        return <AlertContainers key={alert.alerProps.key} alertKey={alert.alerProps.key} alertType={alert.alertType}/>;
    });
   
    return (
        <div className="container-fluid">
        <div className="card">
            <div className="container-fluid editor-area card-header">
                <div className="input-group">
                    <input type="text" className="form-control col-11" placeholder="$"
                        aria-label="AgensBrowser Editor" aria-describedby="editor-buttons" onKeyDown={onEnter} ref={reqString}/>
                    <div className="input-group-append ml-auto" id="editor-buttons">
                        <button className="frame-head-button btn btn-link" type="button"><span className="fa fa-star-o fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button"><span className="fa fa-eraser fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button" onClick={() => onClick()}><span className="fa fa-play-circle-o fa-lg"
                                aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        </div>
        {alerts}


        </div>
    );
}



export default Editor