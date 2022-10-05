import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './store';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga';
import { fetchUser, fetchWallet, changeIsLoggedIn, fetchLikedCoin } from './store/account'


const sagaMiddleware = createSagaMiddleware(); // 사가 미들웨어를 만듭니다.


const store = createStore(rootReducer,
  applyMiddleware(
    sagaMiddleware, // 사가 미들웨어를 적용하고
  ));

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

const root = ReactDOM.createRoot(document.getElementById('root'));


function loadUser() {
  try {    
    const user = localStorage.getItem('user');
    const wallet = localStorage.getItem('wallet')
    const likedCoin = localStorage.getItem('likedCoin')
    if(!user) return;

    store.dispatch(changeIsLoggedIn(true))
    store.dispatch(fetchUser({user: JSON.parse(user)}));
    store.dispatch(fetchWallet(JSON.parse(wallet)));
    store.dispatch(fetchLikedCoin(JSON.parse(likedCoin)))
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadUser();


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);