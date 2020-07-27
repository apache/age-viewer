import React  from 'react';
import ServerStatus from '../../../components/frame/containers/ServerStatusContainer'
import ServerConnect from '../../../components/frame/containers/ServerConnectContainer'
import ServerDisconnect from '../../../components/frame/containers/ServerDisconnectContainer'
import CypherResultFrame from '../../../components/frame/presentations/CypherResultFrame'


const Frames = ({ frameList }) => {
    const frames = frameList.map((frame) => {
        if (frame.frameName === 'ServerStatus') {
            return <ServerStatus key={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'ServerConnect') {
            return <ServerConnect key={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'ServerDisconnect') {
            return <ServerDisconnect key={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
        } else if (frame.frameName === 'CypherResultFrame') {
            return <CypherResultFrame key={frame.frameProps.key} reqKey={frame.frameProps.key} reqString={frame.frameProps.reqString}/>;
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