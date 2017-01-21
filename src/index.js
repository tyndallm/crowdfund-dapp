import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import getRoutes from './config/routes';

import Web3 from 'web3'

import './index.css'

import truffleConfig from '../truffle.js'

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

window.addEventListener('load', function() {
    render((
        <div>
            <Router history={browserHistory}>
                {getRoutes()}
            </Router>
        </div>
    ), document.getElementById('app'));
});
