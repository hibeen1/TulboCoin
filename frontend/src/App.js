import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import SisePage from './pages/SisePage';
import InfoPage from './pages/InfoPage';
import HonorPage from './pages/HonorPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MypagePage from './pages/MypagePage'

function App() {
  return (<>
    <Navbar />
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='sise' element={<SisePage />} />
      <Route path='info' element={<InfoPage />} />
      <Route path='honor/*' element={<HonorPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='mypage' element={<MypagePage />} />
    </Routes>
  </>
  );
}

export default App;
