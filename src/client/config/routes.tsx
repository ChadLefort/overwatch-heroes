import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/common/layout';
import Home from '../components/home';
import HerosContainer from '../features/heros/container';
import HeroContainer from '../features/heros/hero/container';

export default (
    <Route path="/" component={Layout} >
        <IndexRoute component={Home} />
        <Route path="/heros" component={HerosContainer}>
            <Route path="/heros/:id" component={HeroContainer} />
        </Route>
    </Route>
);
