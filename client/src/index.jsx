import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { CookiesProvider } from "react-cookie";
import store from './redux/app/store';
import './index.scss';
import App from './App';



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

