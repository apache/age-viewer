import React from 'react';
import Editor from '../presentations/Editor'
import Frames from '../presentations/Frames'

const Contents = ({ activeMenuName, frameList, alertList, addFrame, addAlert, database }) => {
    return (
        <div id="content" className={activeMenuName !== "" ? " active " : ""}>
                <Editor onClick={addFrame} addAlert={addAlert} alertList={alertList} serverInfo={database} />
                <Frames frameList={frameList} serverInfo={database} />
        </div>
    );
}

export default Contents