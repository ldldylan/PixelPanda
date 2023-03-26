  import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { ModalProvider } from './context/Modal';
import { ModalProvider } from './components/context/Modal';
import { SearchResultProvider } from './components/context/SearchResult';
import configureStore from './store/store';

let store = configureStore({});

function Root() {
  return (
    <ModalProvider>
      <SearchResultProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </SearchResultProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);