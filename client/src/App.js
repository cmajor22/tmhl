import './App.css';
import HeaderBar from './Components/HeaderBar';
import { Box } from '@mui/material';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home';
import LeagueInfo from './Pages/LeagueInfo';
import PresidentsMessage from './Pages/PresidentsMessage';
import Executive from './Pages/Executive';
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
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import bg from './assets/bg.jpg';
import Player from './Pages/Player';

let theme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
	primary: {
		main: '#ff6900'
	},
	tmhl: {
		accent: '#ff6900',
		medium: '#121212',
		dark: '#060606'
	}
  },
  overrides: {
  	root: {
	  "& .MuiDataGrid-root": {
	  },
  }},
  components: {
	  MuiDataGrid: {
		  styleOverrides: {
			  root: {
			  },
		  }
	  }
  }
}));
const isMobile = window.screen.width < 600;
const appBarPadding = isMobile ? '210px' : '120px';

function App() {
  return (
      <ThemeProvider theme={theme}>
		<CssBaseline />
        <Router>
          <Box style={{backgroundImage: `url(${bg})`, backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundColor: '#FFFFFF'}}>
			<Box style={{maxWidth: '960px',height: '100%', minHeight: '100vh', margin: 'auto', backgroundColor: '#1e1e1e', paddingTop: appBarPadding}}>
				<HeaderBar style={{marginBottom: '50px'}}></HeaderBar>
				{/* <Navigation2></Navigation2> */}
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
					<Route exact path="/Player/:playerId"><Player/></Route>
					<Route path="/"><Home /></Route>
				</Switch>
				</Box>
			</Box>
        </Router>
      </ThemeProvider>
  );
}

export default App;
