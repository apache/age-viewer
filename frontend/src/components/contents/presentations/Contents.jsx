import React from 'react';
import {useDispatch} from 'react-redux'
import EditorContainer from '../containers/Editor'
import FramesContainer from '../containers/Frames'

const Contents = ({ database, isActive, getConnectionStatus, addFrame, frames }) => {
    const dispatch = useDispatch();

    if (database.status === 'init') {
        dispatch(() => getConnectionStatus())
    }
    else if (database.status === 'disconnected') {
        const serverConnectFrames = frames.filter((frame) => (frame.frameName === 'ServerConnect'))
        if ( serverConnectFrames.length === 0) {
            dispatch(() => addFrame(':server connect', 'ServerConnect'))
        }
    }

    return (
        <div id="content" className={isActive ? "active" : ""}>
                <EditorContainer />
                <FramesContainer />
        </div>
    );
}

export default Contents