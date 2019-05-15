import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import GameLandingPage from './components/GameLandingPage';
import SelectTrainingPose from './components/training';
import TrainingSinglePose from './components/trainingSinglePose';
import Demo from './components/Demo'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/aboutus" component={AboutUs} />
      <Route exact path="/start" component={GameLandingPage} />
      <Route exact path="/train" component={SelectTrainingPose} />
      <Route exact path="/demo" component={Demo} />
      <Route exact path="/train/:poseName" component={TrainingSinglePose} />
    </Switch>
  );
};

export default Routes;
