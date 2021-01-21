/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {useState, useRef}  from 'react';
import {useDispatch} from 'react-redux'
import uuid from 'react-uuid'
import AlertContainers from '../../alert/containers/AlertContainers'
import CodeMirror from '../../editor/containers/CodeMirrorWapperContainer'

const Editor = ({ addFrame, trimFrame, addAlert, alertList, database, executeCypherQuery, setCommand, addCommandHistory }) => {
    const dispatch = useDispatch();
    const [reqString, setReqString] = useState()
    const codeMirrorRef = useRef()
    const resetCodeMirror = () => {
        codeMirrorRef.current.resetReqString()
        //codeMirrorRef.current.resetReqString()
    }

    const onClick = () => {
        const refKey = uuid()
        if (reqString.toUpperCase().startsWith(':PLAY')) {
            dispatch(() => addFrame(reqString, 'Contents', refKey))
        } else if (reqString.toUpperCase() === ':SERVER STATUS') {
            dispatch(() => trimFrame('ServerStatus'))
            dispatch(() => addFrame(reqString, 'ServerStatus', refKey))
        } else if (database.status === 'disconnected' && reqString.toUpperCase() === ':SERVER DISCONNECT') {
            dispatch(() => trimFrame('ServerDisconnect'))
            dispatch(() => trimFrame('ServerConnect'))
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            dispatch(() => addFrame(reqString, 'ServerDisconnect', refKey))
        } else if (database.status === 'disconnected' && reqString.toUpperCase() === ':SERVER CONNECT') {
            dispatch(() => trimFrame('ServerConnect'))
        } else if (database.status === 'disconnected' && reqString.toUpperCase().match('(MATCH|CREATE).*')) {
            dispatch(() => trimFrame('ServerConnect'))
            dispatch(() => addAlert('ErrorNoDatabaseConnected'))
            dispatch(() => addFrame(reqString, 'ServerConnect', refKey))
        } else if (database.status === 'connected' && reqString.toUpperCase() === ':SERVER DISCONNECT') {
            dispatch(() => trimFrame('ServerDisconnect'))
            dispatch(() => addAlert('NoticeServerDisconnected'))
            dispatch(() => addFrame(reqString, 'ServerDisconnect', refKey))
        } else if (database.status === 'connected' && reqString.toUpperCase() === ':SERVER CONNECT') {
            dispatch(() => trimFrame('ServerStatus'))
            dispatch(() => addAlert('NoticeAlreadyConnected'))
            dispatch(() => addFrame(reqString, 'ServerStatus', refKey))
        } else if (database.status === 'connected' && reqString.toUpperCase().match('(MATCH|CREATE|COPY).*')) {
            const reqStringValue = reqString
            dispatch(() => executeCypherQuery([refKey, reqStringValue]).then((response) => {
                if (response.type === 'cypher/executeCypherQuery/fulfilled'){
                    addFrame(reqStringValue, 'CypherResultFrame', refKey)
                } else if (response.type === 'cypher/executeCypherQuery/rejected'){
                    addFrame(reqStringValue, 'CypherResultFrame', refKey)
                    dispatch(() => addAlert('ErrorCypherQuery'))
                }
            }))
        } else {
            alert("Sorry, I Can't understand your command")
        }
        dispatch(() => addCommandHistory(reqString))
    };

    const alerts = alertList.map((alert) => {
        return <AlertContainers key={alert.alertProps.key} alertKey={alert.alertProps.key} alertName={alert.alertName} errorMessage={alert.alertProps.errorMessage}/>;
    });

    return (
        <div className="container-fluid">
        <div className="card">
            <div className="container-fluid editor-area card-header">
                <div className="input-group">
                    <div className="form-control col-11" style={{padding:'0px'}}>
                    <CodeMirror onClick={onClick} setReqString={setReqString} forwardedRef={codeMirrorRef} />
                    </div>
                    <div className="input-group-append ml-auto" id="editor-buttons">
                        <button className="frame-head-button btn btn-link" type="button"><span className="far fa-star fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button" onClick={() => resetCodeMirror()}><span className="fas fa-eraser fa-lg"
                                aria-hidden="true"></span></button>
                        <button className="frame-head-button btn btn-link" type="button" onClick={() => onClick()}><span className="far fa-play-circle fa-lg"
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