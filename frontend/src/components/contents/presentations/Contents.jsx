import React from 'react';
import {useDispatch} from 'react-redux'
import EditorContainer from '../containers/Editor'
import FramesContainer from '../containers/Frames'

const Contents = ({ database, isActive, getConnectionStatus, getMetaData, getMetaChartData }) => {
    const dispatch = useDispatch();

    if (database.status === 'init') {
        
        dispatch(() => {getConnectionStatus().then((response) => {
            if (response.type === 'database/getConnectionStatus/fulfilled'){
                getMetaData()
                getMetaChartData()
            }
        })})
    }

    return (
        <div id="content" className={isActive ? "active" : ""}>
                <EditorContainer />
                <FramesContainer />
        </div>
    );
}

export default Contents