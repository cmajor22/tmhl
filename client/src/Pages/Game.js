import React, { useEffect, useState } from 'react';
import { Grid, Box, Container, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { gameAway, gameGoals, gameHome, gamePenalties, gamesValue } from '../redux/gamesSlice';
import TmhlTable from '../Components/TmhlTable';

function Game(props) {
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(gamesValue);
    const [ summaryRows, setSummaryRows] = useState([]);
    const [ homeRows, setHomeRows] = useState([]);
    const [ awayRows, setAwayRows] = useState([]);
    let summaryColumns = [
        { field: 'team', headerName: 'TEAM', sortable: false, flex: 1 },
        { field: 'first', headerName: '1', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'second', headerName: '2', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'third', headerName: '3', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'final',  headerName: 'FINAL', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
    ];
    let playerColumns = [
        { field: 'playerName', headerName: 'TEAM', flex: 1 },
        { field: 'points', headerName: 'P', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'goals', headerName: 'G', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'assists', headerName: 'A', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'penalties',  headerName: 'PIM', type: 'number', headerAlign: 'center', align: 'center', width: 20 },
    ];
    
    useEffect(() => {
        fetchData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        fetchData();
    }, [gameId]);// eslint-disable-line react-hooks/exhaustive-deps

    function fetchData() {
        dispatch(gameGoals({gameId}));
        dispatch(gamePenalties({gameId}));
        dispatch(gameHome({gameId}));
        dispatch(gameAway({gameId}));
    }
    
    useEffect(() => {
        let tempGoalsArray = [{home: '', away: ''},{home: 0, away: 0},{home: 0, away: 0},{home: 0, away: 0},{home: 0, away: 0}];
        for(let goal of game.gameGoals) {
            if(goal.homeId===goal.goalTeam) {
                tempGoalsArray[goal.period].home++;
            }else if(goal.awayId===goal.goalTeam) {
                tempGoalsArray[goal.period].away++;
            }
        }

        tempGoalsArray[0].home=game.gameHome[0]?.teamName;
        tempGoalsArray[0].away=game.gameAway[0]?.teamName;

        setSummaryRows([
            {
                id: tempGoalsArray[0].home??'Home', 
                team: tempGoalsArray[0].home,
                first: tempGoalsArray[1].home,
                second: tempGoalsArray[2].home,
                third: tempGoalsArray[3].home,
                final: tempGoalsArray[1].home + tempGoalsArray[2].home + tempGoalsArray[3].home
            },
            {
                id: tempGoalsArray[0].away??'Away', 
                team: tempGoalsArray[0].away,
                first: tempGoalsArray[1].away,
                second: tempGoalsArray[2].away,
                third: tempGoalsArray[3].away,
                final: tempGoalsArray[1].away + tempGoalsArray[2].away + tempGoalsArray[3].away
            }
        ]);
        setHomeRows(game.gameHome.map((statLine) => {
            return {id: statLine.playerName, ...statLine};
        }).sort(playerSort));
        setAwayRows(game.gameAway.map((statLine) => {
            return {id: statLine.playerName, ...statLine};
        }).sort(playerSort));
    }, [game]);// eslint-disable-line react-hooks/exhaustive-deps

    function playerSort(a, b) {
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
        }else if(a.playerName > b.playerName) {
            return 1;
        }
        return -1;
    }

    return <Container>
        <br />
        <Box style={{maxWidth: '500px', margin: 'auto'}}>
            <TmhlTable rows={summaryRows} columns={summaryColumns}></TmhlTable>
        </Box>
        <br />
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography variant='h5'>{homeRows[0]?.teamName}</Typography>
                <TmhlTable rows={homeRows} columns={playerColumns}></TmhlTable>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h5'>{awayRows[0]?.teamName}</Typography>
                <TmhlTable rows={awayRows} columns={playerColumns}></TmhlTable>
            </Grid>
        </Grid>
        <br />
        <br />
    </Container>
}

export default Game;