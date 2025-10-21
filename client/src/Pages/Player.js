import React, { useEffect, useState } from 'react';
import { Box, Container, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import TmhlTable from '../Components/TmhlTable';
import { playerGamesData, playerSeasonsData, playersValue } from '../redux/playersSlice';
import PageTitle from '../Components/PageTitle';
import moment from 'moment';

function Player(props) {
    const { playerId } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(playersValue);
    const isMobile = window.screen.width < 600;
    const [ seasonRows, setSeasonRows ] = useState([]);
    const [ gameRows, setGameRows ] = useState([]);
    const [ playerName, setPlayerName ] = useState([]);
    let seasonsColumns = isMobile ? [
        { field: 'seasonsName', headerName: 'SEASON', width: 95 },
        { field: 'teamName', headerName: 'TEAM', headerAlign: 'center', align: 'center', width: 100 },
        { field: 'goals', headerName: 'G', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'assists', headerName: 'A', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'points',  headerName: 'P', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pims',  headerName: 'PIM', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    ] : [
        { field: 'seasonsName', headerName: 'SEASON', flex: 2 },
        { field: 'teamName', headerName: 'TEAM', headerAlign: 'center', align: 'center', flex: 2 },
        { field: 'goals', headerName: 'GOALS', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'assists', headerName: 'ASSISTS', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'points',  headerName: 'POINTS', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pims',  headerName: 'PIMS', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    ];
    let gamesColumns = isMobile ? [
        { field: 'seasonsName', headerName: 'SEASON', width: 95 },
        { field: 'date', headerName: 'DATE', type: 'number', headerAlign: 'center', align: 'center', width: 95 },
        { field: 'shortForm', headerName: 'TEAM', type: 'number', headerAlign: 'center', align: 'center', width: 95 },
        { field: 'vsShortForm', headerName: 'VS', type: 'number', headerAlign: 'center', align: 'center', width: 100 },
        { field: 'goals',  headerName: 'G', type: 'number', headerAlign: 'center', align: 'center', width: 100 },
        { field: 'assists',  headerName: 'A', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'points',  headerName: 'P', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pims',  headerName: 'PIM', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
    ] : [
        { field: 'seasonsName', headerName: 'SEASON', flex: 1 },
        { field: 'date', headerName: 'DATE', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'teamName', headerName: 'TEAM', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'vs', headerName: 'VS', type: 'number', headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'goals',  headerName: 'GOALS', type: 'number', headerAlign: 'center', align: 'center', width: 40 },
        { field: 'assists',  headerName: 'ASSISTS', type: 'number', headerAlign: 'center', align: 'center', width: 40 },
        { field: 'points',  headerName: 'POINTS', type: 'number', headerAlign: 'center', align: 'center', width: 40 },
        { field: 'pims',  headerName: 'PIMS', type: 'number', headerAlign: 'center', align: 'center', width: 40 },
    ];
    
    useEffect(() => {
        dispatch(playerSeasonsData({playerId}));
        dispatch(playerGamesData({playerId}));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        setSeasonRows(players.playerSeasons.map((season) => {
            return { id: season.seasonsName??season.name, ...season};
        }));
        setGameRows(players.playerGames.map((game) => {
            return { id: game.gamesId, ...game, date: moment(game.date).format('YYYY-MM-DD')};
        }).reverse());
        setPlayerName(players.playerSeasons[0]?.playerName);
    }, [players]);// eslint-disable-line react-hooks/exhaustive-deps


    return <Container sx={{paddingBottom: '15px'}}>
        {players.playerGamesLoading ?
            <Skeleton animation="wave" height={30}/>
            :
            <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                <PageTitle title={playerName} variant="h3" />
            </Box>
        }
        <br />
        {players.playerSeasonsLoading ?
            <Skeleton animation="wave" height={200}/>
            :
            <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                <TmhlTable rows={seasonRows} columns={seasonsColumns}></TmhlTable>
            </Box>
        }
        <br />
        {players.playerGamesLoading ?
            <Skeleton animation="wave" height={500}/>
            :
            <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                <TmhlTable rows={gameRows} columns={gamesColumns}></TmhlTable>
            </Box>
        }
    </Container>
}

export default Player;