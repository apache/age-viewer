import React from 'react';
import Editor from '../presentations/Editor'
import Frames from '../presentations/Frames'

const Contents = ({ activeMenuName, frameList, addFrame, database }) => {
    return (
        <div id="content" className={activeMenuName !== "" ? " active " : ""}>
                <Editor onClick={addFrame} serverInfo={database} />
                <Frames frameList={frameList} />
        </div>
    );
}

export default Contents