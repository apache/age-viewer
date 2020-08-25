import React  from 'react';
import Contents from '../../../components/frame/containers/ContentsFrameContainer'
import ServerStatus from '../../../components/frame/containers/ServerStatusContainer'
import ServerConnect from '../../../components/frame/containers/ServerConnectContainer'
import ServerDisconnect from '../../../components/frame/containers/ServerDisconnectContainer'
import CypherGraphResult from '../../../components/frame/containers/CypherGraphResultContainers'
import CypherResult from '../../../components/frame/containers/CypherResultContainers'


const Frames = ({ frameList, queryResult }) => {
    const frames = frameList.map((frame) => {
        if (frame.frameName === 'Contents') {
            return <Contents key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} playTarget={frame.frameProps.playTarget} isPinned={frame.isPinned}/>;
        } else if (frame.frameName === 'ServerStatus') {
            return <ServerStatus key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
        } else if (frame.frameName === 'ServerConnect') {
            return <ServerConnect key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
        } else if (frame.frameName === 'ServerDisconnect') {
            return <ServerDisconnect key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
        } else if (frame.frameName === 'CypherResultFrame') {
            if (queryResult.hasOwnProperty(frame.frameProps.key) && queryResult[frame.frameProps.key]['command'].toUpperCase() === 'ERROR') {
                return <CypherResult key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
            } else if (queryResult.hasOwnProperty(frame.frameProps.key) && queryResult[frame.frameProps.key]['command'].toUpperCase() === 'GRAPH') {
                return <CypherResult key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
            } else {
                return <CypherGraphResult key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString} isPinned={frame.isPinned}/>;
            }
            
        }
        return '';
    });
    
    return (
        <div className="container-fluid frame-area pt-3">
            {frames}
        </div>
                
    );
}

export default Frames