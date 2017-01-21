import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/AppContainer';
import HomeContainer from '../containers/HomeContainer';

export default () => {
    return (
        <Route path='/' component={AppContainer}>
            <IndexRoute component={HomeContainer}/>
        </Route>
    )
}