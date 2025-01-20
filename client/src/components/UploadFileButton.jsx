// // Filename : App.js
import { useState } from 'react';
import './UploadButton.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';


const UploadFileButton = ({setFileContent}) => {
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        const file = e.target.result;
        setFileContent(file);
    };
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileName(file.name);
            //fileReader.readAsText(file);
            fileReader.readAsText(event.target.files[0]);
        }
    };

    const handleClick = () => {
        document.getElementById('contained-button-file').click();
    };

    //// send to the parser
    const handleAnalayze = () => {
        navigate("/results");
    };
    return (
        <div className='buttonArea'>
            {/* className={styles1.buttonArea}>*/}
            {/* className={styles1.button}>*/}
            {/*style={{
                display: 'flex',
                margin: 'auto',
                width: 400,
                flexWrap: 'wrap',
            }}
        >
            <div style={{ width: '100%', float: 'left' }}>
                <h3>upload the whatsapp file</h3> <br />
            </div>*/}
            <button onClick={handleClick} className='uploadButton'>
                Upload File 📎
            </button>
            {fileName && <div className='fileName'>file name: {fileName}</div>}
            <input
                type='file'
                accept='text/*'
                id='contained-button-file'
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {fileName && (
                <button onClick={handleAnalayze} className='uploadButton'>
                    Analyze 🔄
                </button>
            )}
        </div>
    );
};

UploadFileButton.propTypes = {
    setFileContent: PropTypes.any,
}

export default UploadFileButton;
