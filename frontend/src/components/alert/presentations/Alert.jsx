import React, {useState, useEffect} from 'react';
import {Alert} from 'react-bootstrap'

const SingleAlert = ({key, alertKey, alertName, errorMessage}) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {setShow(false)} , 10000)
        return () => clearTimeout(timer);
    }, [])

    if (alertName === 'NoticeServerDisconnected') {
        return (    
            <Alert show={show} variant="warning" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Database Disconnected</Alert.Heading>
                <p>
                Database is Disconnected. You may use <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connect</a> to
                estableish connection. There's a graph waiting for you.
                </p>
            </Alert>
        );

    } else if (alertName === 'NoticeServerConnected') {
        return (    
            <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Database Connected</Alert.Heading>
                <p>
                Successfully database is connected. You may use <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server status</a> to
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
                You haven't set database connection. You may use <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connect</a> to
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

    } else if (alertName === 'NoticeAlreadyConnected') {
        return (    
            <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Alredy Connected to Database</Alert.Heading>
                <p>
                    You are currently connected to a database. If you want to access to another database, you may execute 
                    <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server disconnect</a> to disconnect from current database first.
                </p>
            </Alert>
        );

    }
    
    
}

export default SingleAlert