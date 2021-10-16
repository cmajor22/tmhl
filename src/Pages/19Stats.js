import React, { Fragment, useEffect } from 'react';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import { statsTeams, statsGoalies, statsPlayers, statsValue } from '../redux/statsSlice';
import { addGA, addGoalie, addGoalieNum, addGP, addLoss, addSO, addTie, addWin } from '../utils/stats';

const useStyles = makeStyles((theme) => ({
    
}));

function Stats19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const seasons = useSelector(seasonsValue);
    const stats = useSelector(statsValue);
    const [season, setSeason] = React.useState('1');
    const [type, setType] = React.useState(0);
  
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
        getData(event.target.value, type);
    };
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }
    
    useEffect(() => {
        dispatch(seasonsList({league: 1}));
    }, []);

    useEffect(() => {
        console.log(stats.statsTeams);
        console.log(stats.statsGoalies);
        console.log(stats.statsPlayers);

        let teams = stats.statsTeams.map((item) => {
            return {
                name: item.name,
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                goalsAgainst: 0,
                shutouts: 0,
                goalie: '',
                goalieNumber: 0
            };
        });
        for(let item of stats.statsGoalies) {
            for(let team of teams) {
                team.gamesPlayed += addGP(item, team.name);
                team.wins += addWin(item, team.name);
                team.losses += addLoss(item, team.name);
                team.ties += addTie(item, team.name);
                team.goalsAgainst += addGA(item, team.name);
                team.shutouts += addSO(item, team.name);
                if(team.goalie==='') {
                    team.goalie = addGoalie(item, team.name);
                    team.goalieNum = addGoalieNum(item, team.name);
                }
            }
        };
        console.log(teams)
        
    }, [stats])

    const getData = (s, t) => {
        let [isPlayoffs, isFinals] = [0, 0];
        if(t==='2') {
            isFinals = 1;
        }else if(t==='1'){
            isPlayoffs = 1;
        }
        dispatch(statsTeams({season: s}));
        dispatch(statsGoalies({isPlayoffs: isPlayoffs, season: s, isFinals: isFinals}));
        dispatch(statsPlayers({isPlayoffs: isPlayoffs, season: s, isFinals: isFinals}));
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
    </Fragment>
}

export default Stats19;