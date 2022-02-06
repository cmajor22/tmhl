import React, { Fragment, useEffect } from 'react';
import { Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import { statsTeams, statsGoalies, statsPlayers, statsValue } from '../redux/statsSlice';
import { addGA, addGoalie, addGoalieNum, addGP, addLoss, addSO, addTie, addWin } from '../utils/stats';
import TmhlTable from '../Components/TmhlTable';
import PageTitle from '../Components/PageTitle';

const useStyles = makeStyles((theme) => ({
    
}));

function Stats19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const seasons = useSelector(seasonsValue);
    const stats = useSelector(statsValue);
    const [season, setSeason] = React.useState('1');
    const [type, setType] = React.useState(0);
    const [goaliesStats, setGoaliesStats] = React.useState([]);
    const [goalsStats, setGoalsStats] = React.useState([]);
    const [assistsStats, setAssistsStats] = React.useState([]);
    const [allStats, setAllStats] = React.useState([]);
    let goaliesColumns = [
        { field: 'goalie', headerName: 'Name', sortable: false, flex: 1 },
        { field: 'gamesPlayed', headerName: 'GP', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'wins',  headerName: 'W', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'losses',  headerName: 'L', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'ties',  headerName: 'T', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'goalsAgainst',  headerName: 'GA', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
        { field: 'goalsAgainstAverage',  headerName: 'GAA', type: 'number', sortable: false, width: 80, headerAlign: 'center', align: 'center' },
        { field: 'shutouts',  headerName: 'SO', type: 'number', sortable: false, width: 60, headerAlign: 'center', align: 'center' },
      ];
    let goalsColumns = [
        { field: 'name', headerName: 'NAME', sortable: false, flex: 1 },
        { field: 'team', headerName: 'TEAM', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'goals',  headerName: 'GOALS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
    ];
    let assistsColumns = [
        { field: 'name', headerName: 'NAME', sortable: false, flex: 1 },
        { field: 'team', headerName: 'TEAM', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'assists',  headerName: 'ASSISTS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
    ];
    let allColumns = [
        { field: 'id', headerName: ' ', sortable: true, width: 20 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 1 },
        { field: 'team', headerName: 'TEAM', type: 'number', sortable: false, width: 150, headerAlign: 'center', align: 'center' },
        { field: 'goals',  headerName: 'GOALS', type: 'number', sortable: true, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'assists',  headerName: 'ASSISTS', type: 'number', sortable: true, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'points',  headerName: 'POINTS', type: 'number', sortable: true, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'pims',  headerName: 'PIMS', type: 'number', sortable: true, width: 100, headerAlign: 'center', align: 'center' },
      ];
  
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
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleSeasonChange({target: {value: seasons.seasons[0].seasonsid}});
        }
    }, [seasons]);

    useEffect(() => {
        let teams = stats.statsTeams.map((item, i) => {
            return {
                id: i,
                name: item.name,
                gamesPlayed: 0,
                wins: 0,
                losses: 0,
                ties: 0,
                goalsAgainst: 0,
                goalsAgainstAverage: 0,
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
        for(let team of teams) {
            team.goalsAgainstAverage = (team.goalsAgainst / team.gamesPlayed).toFixed(3);
        }
        teams.sort((a, b) => {
            if(a.goalsAgainst > b.goalsAgainst) {
                return 1;
            }else if(a.goalsAgainst < b.goalsAgainst) {
                return -1;
            }
            return 0;
        });
        
        setGoaliesStats(teams);

        let players = stats.statsPlayers.map((item, i) => {
            return {
                id: i,
                name: item.playerName,
                team: item.teamName,
                goals: item.goals,
                assists: item.assists,
                points: item.points,
                pims: item.pims,
            }
        });
        let goals = players.sort((a, b) => {
            if(a.goals > b.goals) {
                return -1;
            }else if(a.goals < b.goals) {
                return 1;
            }
            return 0;
        }).slice(0,5);
        setGoalsStats(goals);

        let assists = players.sort((a, b) => {
            if(a.assists > b.assists) {
                return -1;
            }else if(a.assists < b.assists) {
                return 1;
            }
            return 0;
        }).slice(0,5);
        setAssistsStats(assists);

        let all = players.sort((a, b) => {
            if(a.points > b.points) {
                return -1;
            }else if(a.points < b.points) {
                return 1;
            }else if(a.goals > b.goals) {
                return -1;
            }else if(a.goals < b.goals) {
                return 1;
            }else if(a.assists > b.assists) {
                return -1;
            }else if(a.assists < b.assists) {
                return 1;
            }
            return 0;
        });
        let i =1;
        for(let player of all) {
            player.id=i;
            i++;
        }
        setAllStats(all);
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

    return <Container>
        <PageTitle title="19+ Stats" variant="h2"/>
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
                    <InputLabel id="type-select-label">Mode</InputLabel>
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
            </Grid>
            <br />
            
            {(goaliesStats.length!==0) ?
                <Grid item xs={12}>
                    <TmhlTable
                        rows={goaliesStats}
                        columns={goaliesColumns}
                        hasFilter={false}
                    />
                </Grid>
                :
                null
            }
            <br />
            {(goalsStats.length!==0) ?
                <Grid item xs={6}>
                    <TmhlTable
                        rows={goalsStats}
                        columns={goalsColumns}
                        hasFilter={false}
                    />
                </Grid>
                :
                null
            }
            <br />
            {(assistsStats.length!==0) ?
                <Grid item xs={6}>
                    <TmhlTable
                        rows={assistsStats}
                        columns={assistsColumns}
                        hasFilter={false}
                    />
                </Grid>
                :
                null
            }
            <br />
            {(allStats.length!==0) ?
                <Grid item xs={12}>
                    <TmhlTable
                        rows={allStats}
                        columns={allColumns}
                        hasFilter={true}
                        filterType='player'
                    />
                </Grid>
                :
                null
            }
        </Grid>
        <br />
    </Container>
}

export default Stats19;