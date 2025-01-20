import styles from './Home.module.css';
import UploadFileButton from '../../components/UploadFileButton';
import IButton from '../../components/iButton';
import PropTypes from 'prop-types';

const Home = ({setFileContent}) => {
    return (
        <div className={styles.home}>
            <div>
                <h1 className={styles.headline}>
                    SafeChats
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
                How it works: <br></br>Our analyzer will scan the uploaded
                WhatsApp chat file and identify offensive words from a carefully
                curated list of about 400 words and phrases. <br></br>After the
                upload, a results screen will display the number of offensive
                words, who sent them, and which categories they belong to.
                <br></br> No personal data is stored or shared during the
                analysis process. Your data is processed securely and
                anonymously. <br></br>Try it now and see the results!
            </p>
            <h3 className={styles.headline3}>
                upload the whatsapp file here ⬇
            </h3>
            <div className={styles.buttonsBar}>
                <IButton />

                <UploadFileButton setFileContent={setFileContent}/>
            </div>
        </div>
    );
};
Home.propTypes={
  setFileContent: PropTypes.func.isRequired
};
export default Home;