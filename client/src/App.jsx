import { BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import UploadFileButton from './components/common/UploadFileButton/UploadFileButton';
import DisplayData from './components/DisplayData/DisplayData';

function App() {
  const [fileContent, setFileContent] = useState("");
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload_file" element={<UploadFileButton setFileContent={setFileContent} />} />
            <Route path="/results" element={<DisplayData fileContent={fileContent} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
