import React  from 'react';
import ServerStatus from '../../../components/frame/containers/ServerStatusContainer'
import ServerConnect from '../../../components/frame/containers/ServerConnectContainer'
import ServerDisconnect from '../../../components/frame/containers/ServerDisconnectContainer'
import CypherMatchResult from '../../../components/frame/containers/CypherMatchResultContainers'
import CypherDmlResult from '../../../components/frame/containers/CypherDmlResultContainers'


const Frames = ({ frameList, queryResult }) => {
    const frames = frameList.map((frame) => {
        if (frame.frameName === 'ServerStatus') {
            return <ServerStatus key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'ServerConnect') {
            return <ServerConnect key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'ServerDisconnect') {
            return <ServerDisconnect key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'CypherResultFrame') {
            if (queryResult.hasOwnProperty(frame.frameProps.key) && queryResult[frame.frameProps.key]['command'].toUpperCase() === 'GRAPH') {
                return <CypherDmlResult key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
            } else {
                return <CypherMatchResult key={frame.frameProps.key} refKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
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