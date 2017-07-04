import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/common/Layout';
import Home from '../components/home/Home';
import HeroContainer from '../containers/hero/heroContainer';
import HerosContainer from '../containers/heros/herosContainer';

export default (
    <Route path="/" component={Layout} >
        <IndexRoute component={Home} />
        <Route path="/heros" component={HerosContainer}>
            <Route path="/heros/:id" component={HeroContainer} />
        </Route>
    </Route>
);
