import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/appContainer';
import HomeContainer from '../containers/homeContainer';
import ProjectContainer from '../containers/projectContainer';

export default () => {
    return (
        <Route path='/' component={AppContainer}>
            <IndexRoute component={HomeContainer}/>
            <Route path="project/:address" component={ProjectContainer}/>
        </Route>
    )
}