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
import Home from './Pages/Home';
import LeagueInfo from './Pages/LeagueInfo';
import PresidentsMessage from './Pages/PresidentsMessage';
import Executive from './Pages/Executive';
import Navigation from './Components/Navigation';
import { Fragment } from 'react';
import Navigation2 from './Components/Navigation2';
import Stats19 from './Pages/19Stats';
import Rosters19 from './Pages/19Rosters';
import Standings19 from './Pages/19Standings';
import Schedule19 from './Pages/19Schedule';
import Rosters40 from './Pages/40Rosters';
import Standings40 from './Pages/40Standings';
import Schedule40 from './Pages/40Schedule';
import Rules from './Pages/Rules';
import SignUp from './Pages/SignUp';
import Game from './Pages/Game';

function App() {
  return (
      <Router>
        <Box style={{maxWidth: '850px', margin: 'auto'}}>
          <HeaderBar></HeaderBar>
          <Navigation2></Navigation2>
          <Switch>
            <Route exact path="/home"><Home /></Route>
            <Route exact path="/leagueInfo"><LeagueInfo/></Route>
            <Route exact path="/presidentsMessage"><PresidentsMessage/></Route>
            <Route exact path="/executive"><Executive/></Route>
            <Route exact path="/19Rosters"><Rosters19/></Route>
            <Route exact path="/19Stats"><Stats19/></Route>
            <Route exact path="/19Standings"><Standings19/></Route>
            <Route exact path="/19Schedule"><Schedule19/></Route>
            <Route exact path="/40Rosters"><Rosters40/></Route>
            <Route exact path="/40Standings"><Standings40/></Route>
            <Route exact path="/40Schedule"><Schedule40/></Route>
            <Route exact path="/Rules"><Rules/></Route>
            <Route exact path="/SignUp"><SignUp/></Route>
            <Route exact path="/Game/:gameId"><Game/></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </Box>
      </Router>
  );
}

export default App;
