import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import getRoutes from './config/routes';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux'

// import Web3 from 'web3'

import './index.css'

// import truffleConfig from '../truffle.js'

// var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;

const store = configureStore();

window.addEventListener('load', function() {
    render((
        <Provider store={store}>
            <div>
                <Router history={browserHistory}>
                    {getRoutes()}
                </Router>
            </div>
        </Provider>
    ), document.getElementById('app'));
});
