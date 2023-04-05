import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './app/store';
import { CookiesProvider } from "react-cookie";


const root = ReactDOM.createRoot(document.getElementById('root'));
export default root;
root.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>
);

