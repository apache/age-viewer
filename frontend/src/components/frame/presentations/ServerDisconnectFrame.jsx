import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

const ServerDisconnectFrame = ({refKey, reqString, disconnectToAgensGraph, addFrame, removeFrame, addAlert}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(() => disconnectToAgensGraph())
        dispatch(() => addFrame(':server connect'));
        dispatch(() => addAlert('NoticeServerDisconnected'));
    }, [dispatch, disconnectToAgensGraph, addFrame, addAlert])
    



    return (
        <div className="card mt-3">
            <div className="card-header">
                <div className="d-flex card-title text-muted">
                <div className="mr-auto"><strong> $ {reqString} </strong></div>
                    <div className="frame-head-button card-title-collapsed card-title-close px-3"><span className="fa fa-paperclip fa-lg"
                        aria-hidden="true"></span></div>
                    <div className="frame-head-button card-title-collapsed card-title-close px-3" data-toggle="collapse"
                        data-target="#disconnectionCardBody" aria-expanded="false"
                        aria-controls="disconnectionCardBody"><span className="fa fa-lg" aria-hidden="true"></span>
                    </div>
                    <div className="frame-head-button card-title-collapsed card-title-close pl-3">
                        <span className="fa fa-times fa-lg" aria-hidden="true" onClick={() => removeFrame(refKey)}></span></div>
                </div>
            </div>
            <div className="card-body collapse show" id="disconnectionCardBody">
                <div className="row">
                    <div className="col-3">
                        <h3>Disconnected Succesfully</h3>
                        <p>You are successfully disconnected from Agensgraph.</p>
                    </div>
                    <div className="col-9">
                        <p>You may run <a href="/#" className="badge badge-light"><span
                        className="fa fa-play-circle-o fa-lg pr-2" aria-hidden="true"></span>:server connection</a> to establish new connection</p>
                    </div>
                </div>
            </div>
            <div className="card-footer">

            </div>
        </div>
    );
}

export default ServerDisconnectFrame