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

import React, {useState} from 'react'
import { Collapse } from 'react-bootstrap';

const ServerStatusFrame = ({refKey, isPinned, reqString, serverInfo, removeFrame, pinFrame }) => {
    const [isExpanded, setIsExpanded] = useState(true)
    const { host, port, user, database, graph, status } = serverInfo;

    const setIconForIsExpanded = (isExpanded) => {
        if (isExpanded) {
            return <span className="fas fa-angle-up fa-lg" aria-hidden="true"></span>
        } else {
            return <span className="fas fa-angle-down fa-lg" aria-hidden="true"></span>
        }
    }

    const setContent = () => {
        if (status === 'connected') {
            return <div className="card-body collapse" id="connectStatusCardBody">
            <div className="row">
                <div className="col-3">
                    <h3>Connection Status</h3>
                    <p>This is your current connection information.</p>
                </div>
                <div className="col-9">
                    <p>You are connected as user <strong>{user}</strong></p>
                    <p>to <strong>{host}:{port}/{database}</strong></p>
                    <p>Graph path has been set to <strong>{graph}</strong></p>
                </div>
            </div>
        </div>
        } else if (status === 'disconnected') {
            return <div className="card-body collapse" id="connectStatusCardBody">
            <div className="row">
                <div className="col-3">
                    <h3>Connection Status</h3>
                    <p>You are currently not connected to AgensGraph</p>
                </div>
                <div className="col-9">
                    <p>You may run <a href="/#" className="badge badge-light"><span
                                className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connect</a> to access to Agensgraph.
                                </p>
                </div>
            </div>
        </div>
        }


    }
    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                    <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <button className={"frame-head-button btn btn-link px-3" + (isPinned ? " selected " : "")} onClick={() => pinFrame(refKey)}><span className="fas fa-paperclip fa-lg"
                        aria-hidden="true"></span></button>
                    <button className="frame-head-button btn btn-link px-3" data-toggle="collapse"
                        aria-expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} aria-controls={refKey}>
                        {setIconForIsExpanded(isExpanded)}</button>
                    <button className="frame-head-button btn btn-link pl-3">
                        <span className="fas fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></button>
                </div>
            </div>
            <Collapse in={isExpanded}>
                {setContent()}
            </Collapse>
            <div className="card-footer">

            </div>
        </div>
    );
}

export default ServerStatusFrame