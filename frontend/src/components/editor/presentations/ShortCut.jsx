import React from 'react';

const ShortCut = ({ code }) => {
    return (
        <pre className="pre-scrollable code runnable" style={{ maxHeight: '350px' }}>
            {code}
        </pre>
    );
}

export default ShortCut