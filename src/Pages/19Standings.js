import React, { Fragment, useEffect } from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import { standingsValue, standingsGames, standingsTeams, standingsVs } from '../redux/standingsSlice';
import { DataGrid } from '@mui/x-data-grid';
import { addGA, addGF, addGP, addLoss, addPIM, addTie, addWin } from '../utils/games';
import TmhlTable from '../Components/TmhlTable';

const useStyles = makeStyles((theme) => ({
    
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
    const [type, setType] = React.useState(0);
    const [filteredGames, setFilteredGames] = React.useState([]);
    const teamsColumns = [
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
        
        for(let game of standings.standingsGames) {
            for(let team of ts) {
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
        })
        
        setTeams(ts)
        setFilteredGames(standings.standingsGames);
    }, [standings]);

    const getData = (s, t) => {
        let [isPlayoffs, isFinals] = [0, 0];
        if(t==='2') {
            isFinals = 1;
        }else if(t==='1'){
            isPlayoffs = 1;
        }
        dispatch(standingsGames({league: 1, season: s, isPlayoffs: isPlayoffs, isFinals: isFinals}));
        dispatch(standingsTeams({league: 1, season: s}));
        dispatch(standingsVs({league: 1, season: s, isPlayoffs: isPlayoffs, isFinals: isFinals}));
    }

    return <Fragment>
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
        <FormControl fullWidth>
            <InputLabel id="type-select-label">Season</InputLabel>
            <Select
                labelId="type-select-label"
                id="type-select"
                value={type}
                label="Type"
                onChange={handleTypeChange}
            >
                <MenuItem value="0">Regular Season</MenuItem>
                <MenuItem value="1">Playoffs</MenuItem>
                <MenuItem value="2">Finals</MenuItem>
            </Select>
        </FormControl>
        <br /><br />
        {(teams.length!==0) ?
            <DataGrid
                autoHeight
                rows={teams}
                columns={teamsColumns}
                density='compact'
                disableColumnFilter={true}
                disableColumnMenu={true}
                hideFooter={true}
            />
            :
            null
        }
        {(filteredGames.length!==0) ?
            <TmhlTable
                rows={filteredGames}
                columns={gamesColumns}
            />
            :
            null
        }
    </Fragment>
}

export default Standings19;