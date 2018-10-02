import React from 'react';
import { Switch, Route } from "react-router-dom";
import AboutUs from '../AboutUs/AboutUs';
import PoisonSearch from '../PoisonSearch/PoisonSearch';
import PoisonControlHotline from '../PoisonControlHotline/PoisonControlHotline';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PoisonSearch} />
      <Route path='/aboutus' component={AboutUs} />
      <Route path='/poisoncontrol' component={PoisonControlHotline} />
    </Switch>
  </main>
)

export default Main;