import React from 'react';
import { Route } from 'react-router';
import { App, Home, List, Map } from 'containers';

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home}/>
    <Route path="list" component={List}/>
    <Route path="map" component={Map}/>
  </Route>
);
