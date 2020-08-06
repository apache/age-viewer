import React from 'react';
import {useDispatch} from 'react-redux'
import EditorContainer from '../containers/Editor'
import FramesContainer from '../containers/Frames'

const Contents = ({ database, getConnectionStatus, addFrame }) => {
    const dispatch = useDispatch();

    if (database.status === 'init') {
        dispatch(() => getConnectionStatus())
    }
    else if (database.status === 'disconnected') {
        dispatch(() => addFrame(':server connect'))
    }

    return (
        <div id="content">
                <EditorContainer />
                <FramesContainer />
        </div>
    );
}

export default Contents