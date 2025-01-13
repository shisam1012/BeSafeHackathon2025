import React, { useState } from 'react';
import styles from './Home.module.css';
/*import RandomDuck from '../../components/RandomDuck/RandomDuck.jsx';*/

const Home = () => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const handleIClick = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    return (
        <div className={styles.home}>
            <div>
                <h1 className={styles.headline}>
                    Safe Chats
                    <img
                        src='../images/bluetTicks1.png'
                        alt='Logo'
                        className={styles.img1}
                    />
                </h1>
            </div>

            <h2 className={styles.headline2}>
                Upload, Analyze, and Discover Harmful Words{' '}
            </h2>

            <p className={styles.paragraph}>
                {' '}
                How it Works: <br></br>Our analyzer will scan the uploaded
                WhatsApp chat file and identify offensive words from a carefully
                curated list of X words. <br></br>After the upload, a results
                screen will display the number of offensive words, who sent
                them, and which categories they belong to.<br></br> No personal
                data is stored or shared during the analysis process. Your data
                is processed securely and anonymously. <br></br>Try it now and
                see the results!
            </p>
            {isInfoVisible && (
                <div className={styles.overlay}>
                    <div className={styles.infoBox}>
                        <p>
                            How to import the file from whatsapp: <br></br>
                            1. Go to the chat you want to export.<br></br>
                            2. Access Chat Options: Tap the chat or group name
                            at the top, then select Export Chat (on iOS) or More
                            -- Export Chat (on Android).<br></br>
                            3. Choose Media Option: Select without media (text
                            only).<br></br>
                            4. Save/Share the File: Send it via email, save it
                            locally, or upload to a cloud service. <br></br>
                            5. The chat is exported as a .txt file.
                        </p>
                        <button
                            onClick={handleIClick}
                            className={styles.closeButton}
                        >
                            close
                        </button>
                    </div>
                </div>
            )}
            <div>
                <img
                    src='../images/ibutton.png'
                    alt='Logo'
                    className={styles.ibutton}
                    onClick={handleIClick}
                />
            </div>
            {/*<RandomDuck />*/}
        </div>
    );
};

export default Home;
