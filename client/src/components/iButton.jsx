import { useState } from 'react';
import './iButton.css';
const IButton = () => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const handleIClick = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    return (
        <div>
            {isInfoVisible && (
                <div className='overlay'>
                    <div className='infoBox'>
                        <p>
                            How to import the file from whatsapp: <br></br>
                            1. Go to the chat you want to export.<br></br>
                            2. Access Chat Options: Tap the chat or group name
                            at the top, then select Export Chat (on iOS) or More
                            -- Export Chat (on Android).<br></br>
                            3. Choose Media Option: Select without media (text
                            only).
                            <br></br>
                            4. Save/Share the File: Send it via email, save it
                            locally, or upload to a cloud service. <br></br>
                            5. The chat is exported as a .txt file.
                        </p>
                        <button onClick={handleIClick} className='closeButton'>
                            close
                        </button>
                    </div>
                </div>
            )}

            <>
                <img
                    src='../images/ibutton.png'
                    alt='Logo'
                    className='ibutton'
                    onClick={handleIClick}
                />
            </>
        </div>
    );
};
export default IButton;
