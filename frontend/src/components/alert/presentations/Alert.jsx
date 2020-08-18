import React, {useState, useEffect} from 'react';
import {Alert} from 'react-bootstrap'

const SingleAlert = ({key, alertKey, alertType}) => {

    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {setShow(false)} , 5000)
        return () => clearTimeout(timer);
    }, [])

    if (alertType === 'NoticeServerDisconnected') {
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

    } else if (alertType === 'NoticeServerConnected') {
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

    } else if (alertType === 'ErrorNoDatabaseConnected') {
        return (    
            <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>No Database Connected</Alert.Heading>
                <p>
                You haven't set database connection. You may use <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connect</a> to
                        estableish connection. There's a graph waiting for you.
                </p>
            </Alert>
        );

    }
    
    
}

export default SingleAlert