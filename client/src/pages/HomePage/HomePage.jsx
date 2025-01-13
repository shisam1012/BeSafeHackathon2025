import styles from './Home.module.css';
import DisplayData from '../../components/DisplayData/DisplayData.jsx';


const Home = () => {
  return (
    <div className={styles.home}>
      <DisplayData/>
    </div>
  );
};

export default Home;
