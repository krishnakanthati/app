import React, { useState } from 'react';

function ToggleText() {
    const [isHello, setIsHello] = useState(true);
    const toggleMessage = () => {
        setIsHello(prevState => !prevState)
    }

    return (
        <div>
            <p>{isHello ? 'Hello' : 'Goodbye'}</p>
            <button onClick={toggleMessage}>Toggle Text</button>
        </div>
    )
}

export default ToggleText