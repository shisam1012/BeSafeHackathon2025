// // Filename : App.js
import { useState } from 'react';
//import { useContext } from 'react';
const UploadFileButton = () => {
    const [fileContent, setFileContent] = useState('');

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        const file = e.target.result;
        setFileContent(file);
    };
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            fileReader.readAsText(event.target.files[0]);
        }
    };

    return (
        <div style={{ width: 150 }}>
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

            <input
                type='file'
                accept='text/*'
                id='contained-button-file'
                onChange={handleFileChange}
            />
            {fileContent}
        </div>
    );
};

export default UploadFileButton;
