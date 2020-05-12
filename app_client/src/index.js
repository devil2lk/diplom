
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './App.css';
import Header from './Components/Header/Header';
import Main from "./Components/Main/Main";

ReactDOM.render(
    (<BrowserRouter >
        <div>
            <Header/>
            <Main/>
        </div>
    </BrowserRouter >),
    document.getElementById('root'));

serviceWorker.unregister();