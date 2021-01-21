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

import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {Alert} from 'react-bootstrap'

const SingleAlert = ({alertName, errorMessage, setCommand}) => {
    const dispatch = useDispatch();

    const [show, setShow] = useState(true)

    const setAlertConnect = (e, command) => {
        e.preventDefault()
        dispatch(() => {setCommand(command)})
    }

    useEffect(() => {
        const timer = setTimeout(() => {setShow(false)} , 10000)
        return () => clearTimeout(timer);
    }, [])

    if (alertName === 'NoticeServerDisconnected') {
        return (
            <Alert show={show} variant="warning" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Database Disconnected</Alert.Heading>
                <p>
                Database is Disconnected. You may use <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ":server connect")}><span
                        className="far fa-play-circle fa-lg pr-2" aria-hidden="true"></span>:server connect</a> to
                estableish connection. There's a graph waiting for you.
                </p>
            </Alert>
        );

    } else if (alertName === 'NoticeServerConnected') {
        return (
            <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Database Connected</Alert.Heading>
                <p>
                Successfully database is connected. You may use <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ":server status")}><span
                        className="far fa-play-circle fa-lg pr-2" aria-hidden="true" ></span>:server status</a> to
                confirm connected database information.
                </p>
            </Alert>
        );

    } else if (alertName === 'ErrorServerConnectFail') {
        return (
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Database Connection Failed</Alert.Heading>
                <p>
                Failed to connect to the database. Are you sure the database is running on the server?
                </p>
                {errorMessage}
            </Alert>
        );

    } else if (alertName === 'ErrorNoDatabaseConnected') {
        return (
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>No Database Connected</Alert.Heading>
                <p>
                You haven't set database connection. You may use <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ":server connect")}><span
                        className="far fa-play-circle fa-lg pr-2" aria-hidden="true" ></span>:server connect</a> to
                        estableish connection. There's a graph waiting for you.
                </p>
                {errorMessage}
            </Alert>
        );

    } else if (alertName === 'ErrorMetaFail') {
        return (
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Metadata Load Error</Alert.Heading>
                <p>
                Unexpectable error occured while getting metadata.
                </p>
            </Alert>
        );

    } else if (alertName === 'ErrorCypherQuery') {
        return (
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Query Error</Alert.Heading>
                <p>
                Your query wansn't executed properly. Refer the below error message.
                </p>
            </Alert>
        );

    } else if (alertName === 'ErrorPlayLoadFail') {
        return (
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Failed to Load Play Target</Alert.Heading>
                <p>
                '{errorMessage}' does not exists.
                </p>
            </Alert>
        );

    } else if (alertName === 'NoticeAlreadyConnected') {
        return (
            <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Alredy Connected to Database</Alert.Heading>
                <p>
                    You are currently connected to a database. If you want to access to another database, you may execute
                    <a href="/#" className="badge badge-light" onClick={(e) => setAlertConnect(e, ":server disconnect")}><span
                        className="far fa-play-circle fa-lg pr-2" aria-hidden="true" ></span>:server disconnect</a> to disconnect from current database first.
                </p>
            </Alert>
        );

    }


}

export default SingleAlert