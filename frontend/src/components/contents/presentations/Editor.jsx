import React, {useRef}  from 'react';
import {useDispatch} from 'react-redux'
import AlertContainers from '../../alert/containers/AlertContainers'
import uuid from 'react-uuid'


const Editor = ({ addFrame, addAlert, alertList, database, executeCypherQuery }) => {

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
        if (database.status === 'disconnected' && reqString.current.value.match('(match|create).*')) {
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
        } else if (database.status === 'disconnected' && reqString.current.value === ':server status') {
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
        } else if (reqString.current.value.match('(match|create).*')) {
            dispatch(() => executeCypherQuery([refKey, reqString.current.value]).then((response) => {
                if (response.type === 'database/connectToAgensGraph/fulfilled'){
                    addFrame(reqString.current.value, refKey)
                }                
            }))       
        } else if (reqString.current.value.match('(:server).*')) {
            dispatch(() => addFrame(reqString.current.value, refKey))            
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