import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/common/Layout';
import Home from '../components/home/Home';
import HeroContainer from '../containers/heroContainer';
import HeroesContainer from '../containers/heroesContainer';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/heroes" component={HeroesContainer}>
      <Route path="/heroes/:id" component={HeroContainer} />
    </Route>
  </Route>
);
