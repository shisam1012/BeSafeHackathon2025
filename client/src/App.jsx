import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import { useState } from "react";
import projectLogo from './assets/project-logo.png'
//import UploadFileButton from './components/common copy/UploadFileButton/UploadFileButton';
import UploadFileButton from './components/common/UploadFileButton/UploadFileButton';
function App() {
  const [fileContent, setFileContent] = useState("");
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={projectLogo} alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload_file" element={<UploadFileButton setFileContent={setFileContent} />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p> 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
