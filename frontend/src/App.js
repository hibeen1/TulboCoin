import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SisePage from './pages/SisePage';
import HonorPage from './pages/HonorPage';
import SignupPage from './pages/SignupPage';
import MypagePage from './pages/MypagePage'
import HomePage from './pages/HomePage';
import { useDispatch } from "react-redux";
import { catchLogin } from './store/accountSaga'
import { useEffect } from 'react';


function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(catchLogin())
  }, [])

  return (<>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/exchange' element={<SisePage />} />
      <Route path='/honor' element={<HonorPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/mypage' element={<MypagePage />} />
    </Routes>
  </>
  );
}

export default App;
