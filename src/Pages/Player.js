import React, { useEffect, useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, Box, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { gameAway, gameGoals, gameHome, gamePenalties, gamesValue } from '../redux/gamesSlice';
import TmhlTable from '../Components/TmhlTable';
import { playerGamesData, playerSeasonsData, playersValue } from '../redux/playersSlice';
import PageTitle from '../Components/PageTitle';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    
}));

function Player(props) {
    const classes = useStyles();
    const { playerId } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(playersValue);
    const [ seasonRows, setSeasonRows ] = useState([]);
    const [ gameRows, setGameRows ] = useState([]);
    const [ playerName, setPlayerName ] = useState([]);
    let seasonsColumns = [
        { field: 'seasonsName', headerName: 'SEASON', sortable: false, flex: 1 },
        { field: 'teamName', headerName: 'TEAM', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'goals', headerName: 'GOALS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'assists', headerName: 'ASSISTS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'points',  headerName: 'POINTS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
        { field: 'pims',  headerName: 'PIMS', type: 'number', sortable: false, headerAlign: 'center', align: 'center' },
    ];
    let gamesColumns = [
        { field: 'seasonsName', headerName: 'SEASON', sortable: false, flex: 1 },
        { field: 'date', headerName: 'DATE', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'teamName', headerName: 'TEAM', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'vs', headerName: 'VS', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'goals',  headerName: 'GOALS', type: 'number', sortable: false, headerAlign: 'center', align: 'center', width: 40 },
        { field: 'assists',  headerName: 'ASSISTS', type: 'number', sortable: false, headerAlign: 'center', align: 'center', width: 40 },
        { field: 'points',  headerName: 'POINTS', type: 'number', sortable: false, headerAlign: 'center', align: 'center', width: 40 },
        { field: 'pims',  headerName: 'PIMS', type: 'number', sortable: false, headerAlign: 'center', align: 'center', width: 40 },
    ];
    
    useEffect(() => {
        dispatch(playerSeasonsData({playerId}));
        dispatch(playerGamesData({playerId}));
    }, []);
    
    useEffect(() => {
        setSeasonRows(players.playerSeasons.map((season) => {
            return { id: season.seasonsName, ...season};
        }));
        setGameRows(players.playerGames.map((game) => {
            return { id: game.gamesId, ...game, date: moment(game.date).format('YYYY-MM-DD')};
        }).reverse());
        setPlayerName(players.playerSeasons[0].playerName);
    }, [players]);


    return <Container>
        <br />
        <br />
        <PageTitle title={playerName} variant="h3" />
        <br />
        <TmhlTable rows={seasonRows} columns={seasonsColumns}></TmhlTable>
        <br />
        <TmhlTable rows={gameRows} columns={gamesColumns}></TmhlTable>
        <br />
        <br />
    </Container>
}

export default Player;