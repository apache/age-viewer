import React  from 'react';


const Frames = ({ frameList }) => {
    const frames = frameList.map((frame, index) => (
        frame
    ));
    return (
        <div className="container-fluid frame-area pt-3">
            {frames}
        </div>
                
    );
}

export default Frames