import React from 'react';
import './App.css';
import PageFrame from './PageFrame';
import Home from './Home';
import ProjectList from './Projects/ProjectList';
import GameContainer from './Games/GameContainer';
import GamesList from './Games/GamesList'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectRouter from './Projects/ProjectRouter';

function App() {
  return (
    <Router>
      <PageFrame />
      <Route exact path = "/" component = {Home} />
      <Route exact path = "/Projects" component = {ProjectList}/>
      <Route exact path = "/Projects/:projectId" component = {ProjectRouter}/>
      <Route exact path = "/Games" component = {GamesList}/>
      <Route exact path = "/Games/:gameId" component = {GameContainer}/>
    </Router>
  );
}

export default App;
