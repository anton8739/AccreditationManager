import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css'
import 'antd/dist/antd.variable.min.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {browserHistory} from "stores";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter history={browserHistory}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

