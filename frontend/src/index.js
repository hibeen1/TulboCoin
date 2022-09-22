import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';


const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}); // 사가 미들웨어를 만듭니다.


const store = createStore(rootReducer,
  applyMiddleware(
    sagaMiddleware, // 사가 미들웨어를 적용하고
  ));

sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={customHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);