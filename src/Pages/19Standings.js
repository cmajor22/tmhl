import React, { Fragment, useEffect } from 'react';
import { Card, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { seasons19, seasonsValue } from '../redux/seasonsSlice';
import { standingsValue, standingsGames, standingsTeams, standingsVs } from '../redux/standingsSlice';
import { Sort } from '@material-ui/icons';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
    
}));


					
					
function addGP(r,team) {
    return (r.homeTeam === team || r.awayTeam === team) ? 1 : 0;
}


function addWin(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addLoss(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addTie(r,team) {
    if(r.homeTeam===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals===r.awayGoals) {
        return 1;
    }else{
        return 0;
    }
}

function addGF(r,team) {
    if(r.homeTeam===team) {
        return r.homeGoals;
    }else if(r.awayTeam===team) {
        return r.awayGoals;
    }else{
        return 0;
    }
}

function addGA(r,team) {
    if(r.homeTeam===team) {
        return r.awayGoals;
    }else if(r.awayTeam===team) {
        return r.homeGoals;
    }else{
        return 0;
    }
}

function addPIM(r,team) {
    if(r.homeTeam===team) {
        return r.homePIM;
    }else if(r.awayTeam===team) {
        return r.awayPIM;
    }else{
        return 0;
    }
}

function addStreak(r,team) {
    if(r.homeTeam===team) {
        return r.homeStreak;
    }else if(r.awayTeam===team) {
        return r.awayStreak;
    }else{
        return "";
    }
}

function addGPPlayoffs(r,team) {
    if(r.homeTeam===team || r.awayTeam===team) {
        return 1;
    }else{
        return 0;
    }
}


function addWinPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===0) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===0) {
        return 1;
    }else{
        return 0;
    }
}


function addOTWinPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===1) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===1) {
        return 1;
    }else{
        return 0;
    }
}

function addLossPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals && r.isOvertime==0) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===0) {
        return 1;
    }else{
        return 0;
    }
}

function addOTLossPlayoffs(r,team) {
    if(r.homeTeam===team && r.homeGoals<r.awayGoals && r.isOvertime===1) {
        return 1;
    }else if(r.awayTeam===team && r.homeGoals>r.awayGoals && r.isOvertime===1) {
        return 1;
    }else{
        return 0;
    }
}

function addGFPlayoffs(r,team) {
    if(r.homeTeam===team) {
        return r.homeGoals;
    }else if(r.awayTeam===team) {
        return r.awayGoals;
    }else{
        return 0;
    }
}

function addGAPlayoffs(r,team) {
    if(r.homeTeam===team) {
        return r.awayGoals;
    }else if(r.awayTeam===team) {
        return r.homeGoals;
    }else{
        return 0;
    }
}

function addPIMPlayoffs(r,team) {
    if(r.homeTeam===team) {
        return r.homePIM;
    }else if(r.awayTeam===team) {
        return r.awayPIM;
    }else{
        return 0;
    }
}

function Standings19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const seasons = useSelector(seasonsValue);
    const standings = useSelector(standingsValue);
    const [season, setSeason] = React.useState('1');
    const [type, setType] = React.useState(0);
    const columns = [
        { field: 'team', headerName: 'Team' },
        { field: 'gamesPlayed', headerName: 'GP', type: 'number' },
        { field: 'wins',  headerName: 'W', type: 'number' },
        { field: 'losses',  headerName: 'L', type: 'number' },
        { field: 'ties',  headerName: 'T', type: 'number' },
        { field: 'points',  headerName: 'PTS', type: 'number' },
        { field: 'goalsFor',  headerName: 'GF', type: 'number' },
        { field: 'goalsAgainst',  headerName: 'GA', type: 'number' },
        { field: 'plusMinus',  headerName: '+/-', type: 'number' },
        { field: 'penalties',  headerName: 'PIM', type: 'number' },
        { field: 'streak',  headerName: 'Streak', type: 'number' },
      ];
    var teams = [];
  
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
        getData(event.target.value, type);
    };
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
        getData(season, event.target.value);
    };
    
    useEffect(() => {
        dispatch(seasons19(1));     
    }, []);
    
    useEffect(() => {
        if(seasons.seasons19.length>0) {
            setSeason(seasons.seasons19[0]);
            handleSeasonChange({target: {value: seasons.seasons19[0].seasonsid}});
        }
    }, [seasons]);
    
    useEffect(() => {
        teams = [];
        for(let team of standings.standingsTeams) {
            teams.push({
                name: team.name,
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                points: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                penalties: 0,
                winStreak: 0,
                lossStreak: 0,
                tieStreak: 0
            });
        }
        
        for(let game of standings.standingsGames) {
            // for($i=0;$i<$tCount;$i++) {
            for(let team of teams) {
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

        teams.sort((a, b) => {
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
                {seasons.seasons19.map((season) => {
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

{console.log(teams)}
        <DataGrid
            rows={teams}
            columns={columns}
            pageSize={teams.length}
            rowsPerPageOptions={teams.length}
        />

        {standings.standingsGames.map((item) => {
            return <Card>
            <Typography>{item.date.substr(0,10)}</Typography>
                <Typography>{item.homeTeam} - {item.homeGoals}</Typography>
                <Typography>{item.awayTeam} - {item.awayGoals}</Typography>
            </Card>
        })}
    </Fragment>
}

export default Standings19;