import logo from './logo.svg';
import './App.css';
import HeaderBar from './Components/HeaderBar';
import { Box, Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Navigation from './Components/Navigation';
import { Fragment } from 'react';
import Navigation2 from './Components/Navigation2';

function App() {
  return (
      <Router>
        <Box style={{width: '80%', margin: 'auto'}}>
          <HeaderBar></HeaderBar>
          <Navigation2></Navigation2>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/about"><About/></Route>
          </Switch>
        </Box>
      </Router>
  );
}

export default App;
