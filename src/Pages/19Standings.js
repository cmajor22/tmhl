import React, { Fragment, useEffect } from 'react';
import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import { standingsValue, standingsGames, standingsTeams, standingsVs } from '../redux/standingsSlice';
import { DataGrid } from '@mui/x-data-grid';
import { addGA, addGF, addGP, addGPPlayoffs, addLoss, addLossPlayoffs, addOTLossPlayoffs, addOTWinPlayoffs, addPIM, addTie, addWin, addWinPlayoffs } from '../utils/games';
import TmhlTable from '../Components/TmhlTable';
import Game from '../Pages/Game';
import PageTitle from '../Components/PageTitle';

const useStyles = makeStyles((theme) => ({
    finalGameBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '5px',
        marginTop: '10px',
        width: '100%'
    },
    finalGameHeader: {
        width: '50%'
    },
    finalGameContent: {
    }
}));

function getFormattedDate(params) {
    return params.value.substr(0,10);
}

function Standings19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const seasons = useSelector(seasonsValue);
    const standings = useSelector(standingsValue);
    const [season, setSeason] = React.useState('1');
    const [type, setType] = React.useState('Regular Season');
    const [filteredGames, setFilteredGames] = React.useState([]);
    let teamsColumns = [
        { field: 'name', headerName: 'Team', sortable: false, flex: 1 },
        { field: 'gamesPlayed', headerName: 'GP', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'wins',  headerName: 'W', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'losses',  headerName: 'L', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'ties',  headerName: 'T', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'points',  headerName: 'PTS', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'goalsFor',  headerName: 'GF', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'goalsAgainst',  headerName: 'GA', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'plusMinus',  headerName: '+/-', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'penalties',  headerName: 'PIM', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'streak',  headerName: 'Streak', type: 'number', sortable: false, width: 80, headerAlign: 'center', align: 'center' },
      ];
    const gamesColumns = [
        { field: 'date', headerName: 'DATE', sortable: false, width: 120, valueGetter: getFormattedDate },
        { field: 'time', headerName: 'TIME', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'homeTeam',  headerName: 'HOME', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'homeGoals',  headerName: 'GOALS', type: 'number', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'awayTeam',  headerName: 'AWAY', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'awayGoals',  headerName: 'GOALS', type: 'number', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
    ];
    const [teams, setTeams] = React.useState([]);
  
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
        getData(event.target.value, type);
    };
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
        if(event.target.value==='Regular Season') {
            teamsColumns = [
                { field: 'name', headerName: 'Team', sortable: false, flex: 1 },
                { field: 'gamesPlayed', headerName: 'GP', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'wins',  headerName: 'W', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'losses',  headerName: 'L', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'ties',  headerName: 'T', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'points',  headerName: 'PTS', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'goalsFor',  headerName: 'GF', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'goalsAgainst',  headerName: 'GA', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'plusMinus',  headerName: '+/-', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'penalties',  headerName: 'PIM', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'streak',  headerName: 'Streak', type: 'number', sortable: false, width: 80, headerAlign: 'center', align: 'center' },
              ];
        }else{
            teamsColumns = [
                { field: 'name', headerName: 'Team', sortable: false, flex: 1 },
                { field: 'gamesPlayed', headerName: 'GP', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'wins',  headerName: 'RW', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'otWins',  headerName: 'OW', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'otLosses',  headerName: 'OL', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'losses',  headerName: 'L', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'points',  headerName: 'PTS', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'goalsFor',  headerName: 'GF', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'goalsAgainst',  headerName: 'GA', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'plusMinus',  headerName: '+/-', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
                { field: 'penalties',  headerName: 'PIM', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
              ];
        }
        getData(season, event.target.value);
    };
    
    useEffect(() => {
        dispatch(seasonsList({league: 1}));     
    }, []);
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleSeasonChange({target: {value: seasons.seasons[0].seasonsid}});
        }
    }, [seasons]);
    
    useEffect(() => {
        let ts = [];
        for(let team of standings.standingsTeams) {
            ts.push({
                id: 0,
                name: team.name,
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                points: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                penalties: 0,
                streak: 0,
                winStreak: 0,
                lossStreak: 0,
                tieStreak: 0,
                plusMinus: 0
            });
        }
        console.log(type)
        for(let game of standings.standingsGames) {
            for(let team of ts) {
                if(type==='Regular Season') {
                    team.gamesPlayed += addGP(game,team.name);
                    team.wins+=addWin(game,team.name);
                    team.losses+=addLoss(game,team.name);
                    team.ties+=addTie(game,team.name);
                    team.points+=addWin(game,team.name)*2+addTie(game,team.name);
                    team.goalsFor+=addGF(game,team.name);
                    team.goalsAgainst+=addGA(game,team.name);
                    team.penalties+=addPIM(game,team.name);
                    
                    if(game.homeTeam===team.name || game.awayTeam===team.name) {
                        if(team.winStreak>0) {
                            if(addWin(game,team.name)>0) {
                                team.winStreak+=addWin(game,team.name);
                            }else{
                                team.winStreak=0;
                                team.lossStreak+=addLoss(game,team.name);
                                team.tieStreak+=addTie(game,team.name);
                            }
                        }else if(team.lossStreak>0) {
                            if(addLoss(game,team.name)>0) {
                                team.lossStreak+=addLoss(game,team.name);
                            }else{
                                team.winStreak+=addWin(game,team.name);
                                team.lossStreak=0;
                                team.tieStreak+=addTie(game,team.name);
                            }
                        }else if(team.tieStreak>0){
                            if(addTie(game,team.name)){
                                team.tieStreak+=addTie(game,team.name);
                            }else{
                                team.winStreak+=addWin(game,team.name);
                                team.lossStreak+=addLoss(game,team.name);
                                team.tieStreak=0;
                            }
                        }else{
                            team.winStreak+=addWin(game,team.name);
                            team.lossStreak+=addLoss(game,team.name);
                            team.tieStreak+=addTie(game,team.name);
                        }
                    }
                    team.plusMinus+=addGF(game,team.name)-addGA(game,team.name);
                }else{
                    team.gamesPlayed += addGP(game,team.name);
                    team.wins+=addWinPlayoffs(game,team.name);
                    team.otWins+=addOTWinPlayoffs(game,team.name);
                    team.otLosses+=addOTLossPlayoffs(game,team.name);
                    team.losses+=addLossPlayoffs(game,team.name);
                    team.points+=addWinPlayoffs(game,team.name)*3+addOTWinPlayoffs(game,team.name)*2+addOTLossPlayoffs(game,team.name);
                    team.goalsFor+=addGF(game,team.name);
                    team.goalsAgainst+=addGA(game,team.name);
                    team.penalties+=addPIM(game,team.name);
                    team.plusMinus+=addGF(game,team.name)-addGA(game,team.name);
                }
            }
        }

        ts.sort((a, b) => {
            if(a.points>b.points) {
                return -1;
            }else if(a.points<b.points) {
                return 1;
            }else if(a.wins>b.wins){
                return -1;
            }else if(a.wins<b.wins){
                return 1;
            }
            
            for(let item of standings.standingsVs) {
                if(item.team===a.name && item.vs===b.name) {
                    if(item.h2h>0) {
                        return -1;
                    }else if(item.h2h<0) {
                        return 1;
                    }
                }
            }
            
            if(a.goalsFor-a.goalsAgainst>b.goalsFor-b.goalsAgainst){
                return -1;
            }else{
                return 1;
            }
        });

        let i = 0;
        ts.forEach((team) => {
            team.id = i;
            if(team.winStreak>0) {
                team.streak = `WON ${team.winStreak}`;
            }else if(team.lossStreak>0){
                team.streak = `LOST ${team.lossStreak}`;
            }else if(team.tieStreak>0){
                team.streak = `TIED ${team.tieStreak}`;
            }
            i++;
        });
        
        setTeams(ts);
        setFilteredGames(standings.standingsGames);
    }, [standings]);

    const getData = (s, t) => {
        let [isPlayoffs, isFinals] = [0, 0];
        if(t==='Finals') {
            isFinals = 1;
        }else if(t==='Playoffs'){
            isPlayoffs = 1;
        }
        dispatch(standingsGames({league: 1, season: s, isPlayoffs: isPlayoffs, isFinals: isFinals}));
        dispatch(standingsTeams({league: 1, season: s}));
        dispatch(standingsVs({league: 1, season: s, isPlayoffs: isPlayoffs, isFinals: isFinals}));
    }

    function finalGameOrder(a,b) {
        let aTime = a.time.toString().split(':')[0];
        let bTime = b.time.toString().split(':')[0];
        if(aTime < bTime) {
            return 1;
        }else{
            return -1;
        }
    }

    return <Container>
        <PageTitle title="19+ Standings" variant="h2"/>
        <br />
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="season-select-label">Season</InputLabel>
                    <Select
                        labelId="season-select-label"
                        id="season-select"
                        value={season}
                        label="Season"
                        onChange={handleSeasonChange}
                    >
                        {seasons.seasons.map((season) => {
                            return <MenuItem value={season.seasonsid}>{season.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        value={type}
                        label="Type"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="Regular Season">Regular Season</MenuItem>
                        <MenuItem value="Playoffs">Playoffs</MenuItem>
                        <MenuItem value="Finals">Finals</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <br /><br />
            {type!=='Finals' && teams.length!==0 &&
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight
                        rows={teams}
                        columns={teamsColumns}
                        density='compact'
                        disableColumnFilter={true}
                        disableColumnMenu={true}
                        hideFooter={true}
                    />
                </Grid>
            }
            {type!=='Finals' && filteredGames.length!==0 &&
                <Grid item xs={12}>
                    <TmhlTable
                        rows={filteredGames}
                        columns={gamesColumns}
                        hasFilter={true}
                    />
                </Grid>
            }
            {type==='Finals' &&
                <Grid item xs={12}>
                    {[...filteredGames].sort(finalGameOrder).map((game, index) => {
                        return <Paper elevation={3} className={classes.finalGameBox}>
                            <Box className={classes.finalGameHeader}>
                                {index===0 && <PageTitle title="Championship" variant="h3"/>}
                                {index===1 && <PageTitle title="3RD Place" variant="h3"/>}
                                {index===2 && <PageTitle title="5TH Place" variant="h3"/>}
                                {index===3 && <PageTitle title="7TH Place" variant="h3"/>}
                            </Box>
                            <Box className={classes.finalGameContent}>
                                <Typography variant="h6">
                                    {game.homeGoals > game.awayGoals && `${game.homeTeam} (${game.homeGoals}) over ${game.awayTeam} (${game.awayGoals})`}
                                    {game.homeGoals < game.awayGoals && `${game.awayTeam} (${game.awayGoals}) over ${game.homeTeam} (${game.homeGoals})`}
                                </Typography>
                            </Box>
                        </Paper>
                    })}
                </Grid>
            }
        </Grid>
        <br />
    </Container>
}

export default Standings19;