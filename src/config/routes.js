import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/AppContainer';
import HomeContainer from '../containers/HomeContainer';
import ProjectContainer from '../containers/ProjectContainer';

export default () => {
    return (
        <Route path='/' component={AppContainer}>
            <IndexRoute component={HomeContainer}/>
            <Route path="project/:address" component={ProjectContainer}/>
        </Route>
    )
}