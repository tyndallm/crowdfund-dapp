import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {configureStore} from './store/configureStore';
import getRoutes from './config/routes';
import DevTools from './containers/devTools';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const devTools = () => {
    if (process.env.NODE_ENV === "production") {
        return null;
    } else {
        return <DevTools/>;
    }
};

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                {getRoutes()}
            </Router>
            {devTools()}
        </div>
    </Provider>,
  document.getElementById('root')
);
