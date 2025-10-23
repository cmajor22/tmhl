import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
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
    const [ medals, setMedals ] = useState([]);
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
        let medals = {
            gamesPlayed: 0, totalGoals: 0, totalAssists: 0, totalPoints: 0, totalPims: 0,
            goalsPer: 0, assistsPer: 0, pointsPer: 0, penaltiesPer: 0,
            goals5: 0, goals4: 0, goals3: 0, goals2: 0, goals1: 0,
            assists5: 0, assists4: 0, assists3: 0, assists2: 0, assists1: 0,
            points10: 0, points9: 0, points8: 0, points7: 0, points6: 0, points5: 0, points4: 0, points3: 0, points2: 0, points1: 0,
            gordies: 0, goalStreak: 0, assistStreak: 0, pointStreak: 0, pimStreak: 0
        };
        let [tempGoalStreak, tempAssistStreak, tempPointStreak, tempPimStreak] = [0, 0, 0, 0];
        players.playerGames.map((g, i) => {
            medals.gamesPlayed++;
            medals.totalGoals+=g.goals;
            medals.totalAssists+=g.assists;
            medals.totalPoints+=g.points;
            medals.totalPims+=g.pims;
            if(g.goals>=5) {
                medals.goals5++;
            } else if(g.goals===4) {
                medals.goals4++;
            } else if(g.goals===3) {
                medals.goals3++;
            } else if(g.goals===2) {
                medals.goals2++;
            } else if(g.goals===1) {
                medals.goals1++;
            }
            if(g.assists>=5) {
                medals.assists5++;
            } else if(g.assists===4) {
                medals.assists4++;
            } else if(g.assists===3) {
                medals.assists3++;
            } else if(g.assists===2) {
                medals.assists2++;
            } else if(g.assists===1) {
                medals.assists1++;
            }
            if(g.point10>=10) {
                medals.points10++;
            } else if(g.points===9) {
                medals.points9++;
            } else if(g.points===8) {
                medals.points8++;
            } else if(g.points===7) {
                medals.points7++;
            } else if(g.points===6) {
                medals.points6++;
            } else if(g.points===5) {
                medals.points5++;
            } else if(g.points===4) {
                medals.points4++;
            } else if(g.points===3) {
                medals.points3++;
            } else if(g.points===2) {
                medals.points2++;
            } else if(g.points===1) {
                medals.points1++;
            }
            if(g.goals > 0 && g.assists > 0 && g.pims > 0) {
                medals.gordies++;
            }
            if(g.goals>=1) {
                tempGoalStreak++;
            } else {
                if(medals.goalStreak<tempGoalStreak) {
                    medals.goalStreak=tempGoalStreak;
                }
                tempGoalStreak=0;
            }
            if(g.assists>=1) {
                tempAssistStreak++;
            } else {
                if(medals.assistStreak<tempAssistStreak) {
                    medals.assistStreak=tempAssistStreak;
                }
                tempAssistStreak=0;
            }
            if(g.points>=1) {
                tempPointStreak++;
            } else {
                if(medals.pointStreak<tempPointStreak) {
                    medals.pointStreak=tempPointStreak;
                }
                tempPointStreak=0;
            }
            if(g.pims>=1) {
                tempPimStreak++;
            } else {
                if(medals.pimStreak<tempPimStreak) {
                    medals.pimStreak=tempPimStreak;
                }
                tempPimStreak=0;
            }
            return '';
        });
        setMedals(medals)
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
                <PageTitle title='Accolades' variant="h3" /><br />
                <Grid container spacing={1}>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Games Played
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.gamesPlayed}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Goals
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.totalGoals}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Assists
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.totalAssists}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Points
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.totalPoints}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                PIMs
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.totalPims}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                GPG
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{(medals.totalGoals/medals.gamesPlayed).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                APG
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{(medals.totalAssists/medals.gamesPlayed).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                PPG
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{(medals.totalPoints/medals.gamesPlayed).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                PIMsPG
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{(medals.totalPims/medals.gamesPlayed).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={1}>
                    {medals.goals1>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                One Goal Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goals1}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.goals2>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Two Goal Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goals2}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.goals3>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Three Goal Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goals3}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.goals4>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Four Goal Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goals4}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.goals5>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Five Goal Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goals5}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                </Grid>
                <br />
                <Grid container spacing={1}>
                    {medals.assists1>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                One Assist Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assists1}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.assists2>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Two Assist Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assists2}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.assists3>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Three Assist Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assists3}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.assists4>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Four Assist Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assists4}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.assists5>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Five Assist Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assists5}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                </Grid>
                <br />
                <Grid container spacing={1}>
                    {medals.points1>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                One Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points1}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points2>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Two Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points2}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points3>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Three Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points3}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points4>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Four Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points4}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points5>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Five Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points5}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points6>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Six Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points6}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points7>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Seven Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points7}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points8>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Eight Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points8}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points9>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Nine Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points9}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.points10>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Ten (!) Point Games
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.points10}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                </Grid>
                <br />
                <Grid container spacing={1}>
                    {medals.goalStreak>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Longest Goal Streak
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.goalStreak}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.assistStreak>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Assist Streak
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.assistStreak}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.pointStreak>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Point Streak
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.pointStreak}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                    {medals.pimStreak>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Penalty Streak
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.pimStreak}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                </Grid>
                <br />
                <Grid container spacing={1}>
                    {medals.gordies>0 &&
                    <Grid item xs={6} md={3}>
                        <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
                                Gordies
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                                <Typography variant='h3'>{medals.gordies}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    }
                </Grid>
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