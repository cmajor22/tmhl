import React, { useEffect, useState } from 'react';
import { Grid, Box, Container, Typography, Skeleton } from '@mui/material';
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
    const [ events, setevents ] = useState([]);
    let summaryColumns = [
        { field: 'team', headerName: 'TEAM', sortable: false, flex: 2 },
        { field: 'first', headerName: '1', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'second', headerName: '2', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'third', headerName: '3', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'final',  headerName: 'F', type: 'number', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
    ];
    let playerColumns = [
        { field: 'playerName', headerName: 'TEAM', flex: 1 },
        { field: 'points', headerName: 'P', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'goals', headerName: 'G', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'assists', headerName: 'A', type: 'number', headerAlign: 'center', align: 'center', width: 10 },
        { field: 'penalties',  headerName: 'PIM', type: 'number', headerAlign: 'center', align: 'center', width: 20 },
    ];

    function Event(e) {
        if(e.isGoal===1) {
            return <Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}}>
                <Box sx={{width: '42px'}}>
                    {e.goalTeam===e.homeId ?
                        <img src={`/assets/${e.homeShortForm}.svg`} alt="Home Logo"/>
                        :
                        <img src={`/assets/${e.awayShortForm}.svg`} alt="Away Logo"/>    
                    }
                </Box>
                <Box sx={{width: '120px', marginLeft: '5px', marginRight: '5px'}}>
                    {e.goalTeam===e.homeId ?
                        <Box sx={{textAlign: 'center', border: `2px solid #${e.homePrimaryColour}`, borderRadius: '3px'}}>
                            <Typography sx={{fontSize: '14px'}}>GOAL</Typography>
                        </Box>
                        :
                        <Box sx={{textAlign: 'center', border: `2px solid #${e.awayPrimaryColour}`, borderRadius: '3px'}}>
                            <Typography sx={{fontSize: '14px'}}>GOAL</Typography>
                        </Box>
                    }
                </Box>
                <Box sx={{width: '60px', textAlign: 'right'}}>
                    <Typography>{e.eventTime}</Typography>
                </Box>
                <Box sx={{paddingLeft: '15px', width: '100%'}}>
                    <Typography>
                        {` ${e.goal}`}
                        {e.assist1 !== '' ? ` from ${e.assist1}` : ' (unassisted)'}
                        {e.assist2 !== '' ? ` and ${e.assist2}` : ''}
                        {e.isPP === 1 ? ' (PP)' : ''}
                        {e.isSHG === 1 ? ' (SH)' : ''}
                    </Typography>
                </Box>
            </Box>
        } else if(e.isPenalty===1) {
            return <Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '5px'}}>
                <Box sx={{width: '42px'}}>
                    {e.penaltyTeam===e.homeId ?
                        <img src={`/assets/${e.homeShortForm}.svg`} alt="Home Logo"/>
                        :
                        <img src={`/assets/${e.awayShortForm}.svg`} alt="Away Logo"/>    
                    }
                </Box>
                <Box sx={{width: '120px', marginLeft: '5px', marginRight: '5px'}}>
                    {e.penaltyTeam===e.homeId ?
                        <Box sx={{textAlign: 'center', border: `2px solid #${e.homePrimaryColour}`, borderRadius: '3px'}}>
                            <Typography sx={{fontSize: '14px'}}>PENALTY</Typography>
                        </Box>
                        :
                        <Box sx={{textAlign: 'center', border: `2px solid #${e.awayPrimaryColour}`, borderRadius: '3px'}}>
                            <Typography sx={{fontSize: '14px'}}>PENALTY</Typography>
                        </Box>
                    }
                </Box>
                <Box sx={{width: '60px', textAlign: 'right'}}>
                    <Typography>{e.eventTime}</Typography>
                </Box>
                <Box sx={{paddingLeft: '15px', width: '100%'}}>
                    <Typography>
                        
                        {` ${e.penalty}, ${e.minutes} minutes for ${e.infraction}`}
                    </Typography>
                </Box>
            </Box>
        }
    }
    
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

        // Create uniform sort value for goals (period - minutes - seconds, as it counts down)
        let goals = game.gameGoals.map(g => ({
            ...g,
            eventTime: g.goalTime,
            isGoal: 1,
            isPenalty: 0,
            sortVal: g.period * 10000 - g.goalTime?.split(":")[0]*60 - g.goalTime?.split(":")[1]
        }));
        // Create uniform sort value for penalties (period - minutes - seconds, as it counts down)
        let penalties = game.gamePenalties.map(p => ({
            ...p,
            isOT: 0,
            isGoal: 0,
            isPenalty: 1,
            eventTime: p.penaltyTime,
            sortVal: p.period * 10000 - p.penaltyTime?.split(":")[0]*60 - p.penaltyTime?.split(":")[1]
        }));
        // Sort events based on uniform values
        let events = [ ...goals, ...penalties ].sort((a, b) => a.sortVal - b.sortVal);
        // Group events to make display easier
        let groupedEvents = [
            [ ...events.filter(e => e.period?.toString()==="1") ],
            [ ...events.filter(e => e.period?.toString()==="2") ],
            [ ...events.filter(g => g.period?.toString()==="3" && g.isOT===0)],
            [ ...events.filter(g => g.period?.toString()==="3" && g.isOT===1)],
        ];
        setevents(groupedEvents);
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

    return <Container sx={{paddingBottom: '15px'}}>
        <Box style={{maxWidth: '500px', margin: 'auto'}}>
            {(game.gameHomeLoading || game.gameAwayLoading) ?
                <Skeleton animation="wave" height={100}/>
                :
                <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                    <TmhlTable rows={summaryRows} columns={summaryColumns}></TmhlTable>
                    <br />
                    <Typography variant="h4">First Period</Typography>
                    <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                        {events[0]?.map(e => Event(e))}
                    </Box>
                    <Typography variant="h4">Second Period</Typography>
                    <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                        {events[1]?.map(e => Event(e))}
                    </Box>
                    <Typography variant="h4">Third Period</Typography>
                    <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                        {events[2]?.map(e => Event(e))}
                    </Box>
                    {events[3].length>0 ?
                        [
                            <Typography variant="h4">Overtime</Typography>,
                            <Box sx={{marginTop: '15px', marginBottom: '15px'}}>
                                {events[3]?.map(e => Event(e))}
                            </Box>
                        ]
                        :
                        null
                    }
                </Box>
            }
        </Box>
        <br />
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                {game.gameHomeLoading ?
                    <Skeleton animation="wave" height={300}/>
                    :
                    <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                        <Typography variant='h5'>{homeRows[0]?.teamName}</Typography>
                        <TmhlTable rows={homeRows} columns={playerColumns}></TmhlTable>
                    </Box>
                }
            </Grid>
            <Grid item xs={12} md={6}>
                {game.gameAwayLoading ?
                    <Skeleton animation="wave" height={300}/>
                    :
                    <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                        <Typography variant='h5'>{awayRows[0]?.teamName}</Typography>
                        <TmhlTable rows={awayRows} columns={playerColumns}></TmhlTable>
                    </Box>
                }
            </Grid>
        </Grid>
    </Container>
}

export default Game;