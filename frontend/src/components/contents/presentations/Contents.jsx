import React from 'react';
import {useDispatch} from 'react-redux'
import EditorContainer from '../containers/Editor'
import FramesContainer from '../containers/Frames'

const Contents = ({ activeMenuName, database, getConnectionStatus, addFrame }) => {
    const dispatch = useDispatch();

    console.log(database.status)
    if (database.status === 'init') {
        dispatch(() => getConnectionStatus())
    }
    else if (database.status === 'disconnected') {
        dispatch(() => addFrame(':server connect'))
    }

    return (
        <div id="content" className={activeMenuName !== "" ? " active " : ""}>
                <EditorContainer />
                <FramesContainer />
        </div>
    );
}

export default Contents