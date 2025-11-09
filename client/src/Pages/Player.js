import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import TmhlTable from '../Components/TmhlTable';
import { playerGamesData, playerSeasonsData, playerPointsData, playerPenaltiesData, playersValue } from '../redux/playersSlice';
import PageTitle from '../Components/PageTitle';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function getOptions(title) {
    return {
        indexAxis: 'y',
        elements: { bar: { borderWidth: 1 } },
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
            legend: { display: false }, 
            title: { 
                display: true, 
                text: title,
                color: '#fff'
            } 
        },
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
        }
    };

}

function StatItem(title, value) {
    return <Box sx={{border: '1px solid #ff6900', borderRadius: '5px'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', borderBottom: '1px solid #ff690080'}}>
            {title}
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
            <Typography variant='h3'>{value}</Typography>
        </Box>
    </Box>;
}

function Player(props) {
    const { playerId } = useParams();
    const dispatch = useDispatch();
    const players = useSelector(playersValue);
    const isMobile = window.innerWidth < 600;
    const [ seasonRows, setSeasonRows ] = useState([]);
    const [ gameRows, setGameRows ] = useState([]);
    const [ playerName, setPlayerName ] = useState([]);
    const [ medals, setMedals ] = useState([]);
    const [ pointStats, setpointStats ] = useState({labels: [], datasets: []});
    const [ goalStats, setgoalStats ] = useState({labels: [], datasets: []});
    const [ assistStats, setassistStats ] = useState({labels: [], datasets: []});
    
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
        dispatch(playerPointsData({playerId}));
        dispatch(playerPenaltiesData({playerId}));
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
    }, [players.playerGames, players.playerSeasons]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let pointStats = {
            first: 0, second: 0, third: 0, overtime: 0, evenStrength: 0, shortHanded: 0, powerplay: 0
        }
        let goalStats = {
            first: 0, second: 0, third: 0, overtime: 0, evenStrength: 0, shortHanded: 0, powerplay: 0, assisted: 0, unassisted: 0
        }
        let assistStats = {
            first: 0, second: 0, third: 0, overtime: 0, evenStrength: 0, shortHanded: 0, powerplay: 0, primary: 0, secondary: 0
        }
        players.playerPoints.forEach(p => {
            // Goals
            if(p.period===1 && p.goal.toString()===playerId) {
                goalStats.first++;
                pointStats.first++;
            }else if(p.period===2 && p.goal.toString()===playerId){
                goalStats.second++;
                pointStats.second++;
            }else if(p.period===3 && p.isOT===0 && p.goal.toString()===playerId){
                goalStats.third++;
                pointStats.third++;
            }else if(p.isOT===1 && p.goal.toString()===playerId){
                goalStats.overtime++;
                pointStats.overtime++;
            }
            if(p.isSHG===1 && p.goal.toString()===playerId){
                goalStats.shortHanded++;
                pointStats.shortHanded++;
            }else if(p.isPP===1 && p.goal.toString()===playerId){
                goalStats.powerplay++;
                pointStats.powerplay++;
            }else if(p.goal.toString()===playerId){
                goalStats.evenStrength++;
                pointStats.evenStrength++;
            }
            if(p.assist1===0 && p.assist2===0 && p.goal.toString()===playerId){
                goalStats.unassisted++;
            }else if(p.goal.toString()===playerId){
                goalStats.assisted++;
            }
            
            // Assists
            if(p.period===1 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)) {
                assistStats.first++;
                pointStats.first++;
            }else if(p.period===2 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.second++;
                pointStats.second++;
            }else if(p.period===3 && p.isOT===0 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.third++;
                pointStats.third++;
            }else if(p.isOT===1 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.overtime++;
                pointStats.overtime++;
            }
            if(p.isSHG===1 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.shortHanded++;
                pointStats.shortHanded++;
            }else if(p.isPP===1 && (p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.powerplay++;
                pointStats.powerplay++;
            }else if((p.assist1.toString()===playerId || p.assist2.toString()===playerId)){
                assistStats.evenStrength++;
                pointStats.evenStrength++;
            }
            if(p.assist1.toString()===playerId){
                assistStats.primary++;
            }else if(p.assist2.toString()===playerId){
                assistStats.secondary++;
            }
        });
        setpointStats([
            pointStats.first, pointStats.second, pointStats.third, pointStats.overtime, 
            pointStats.evenStrength, pointStats.powerplay, pointStats.shortHanded
        ]);
        setgoalStats([
            goalStats.first, goalStats.second, goalStats.third, goalStats.overtime, goalStats.evenStrength,
            goalStats.powerplay, goalStats.shortHanded, goalStats.assisted, goalStats.unassisted
        ]);
        setassistStats([
            assistStats.first, assistStats.second, assistStats.third, assistStats.overtime, assistStats.evenStrength,
            assistStats.powerplay, assistStats.shortHanded, assistStats.primary, assistStats.secondary
        ]);
    }, [players.playerPoints, playerId]);

    useEffect(() => {
        
    }, [players.playerPenalties]);


    return <Container sx={{paddingBottom: '15px'}}>
        {players.playerGamesLoading ?
            <Skeleton animation="wave" height={30}/>
            :
            <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                <PageTitle title={playerName} variant="h3" />
            </Box>
        }
        {players.playerGamesLoading || players.playerPointsLoading ?
            <Skeleton animation="wave" height={200}/>
            :
            <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px', marginTop: '20px'}}>
                <PageTitle title='Accolades' variant="h3" /><br />
                
                <Box sx={{padding: '10px', marginBottom: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>{StatItem('Games Played',medals.gamesPlayed)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('Points',medals.totalPoints)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('PPG',(medals.totalPoints/medals.gamesPlayed).toFixed(2))}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('PIMs',medals.totalPims)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('Point Streak',medals.pointStreak)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('Goal Streak',medals.goalStreak)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('Assist Streak',medals.assistStreak)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('Gordies',medals.gordies)}</Grid>
                        {!!medals.points1 && <Grid item xs={6} md={3}>{StatItem('1 Point Games', medals.points1)}</Grid>}
                        {!!medals.points2 && <Grid item xs={6} md={3}>{StatItem('2 Point Games', medals.points2)}</Grid>}
                        {!!medals.points3 && <Grid item xs={6} md={3}>{StatItem('3 Point Games', medals.points3)}</Grid>}
                        {!!medals.points4 && <Grid item xs={6} md={3}>{StatItem('4 Point Games', medals.points4)}</Grid>}
                        {!!medals.points5 && <Grid item xs={6} md={3}>{StatItem('5 Point Games', medals.points5)}</Grid>}
                        {!!medals.points6 && <Grid item xs={6} md={3}>{StatItem('6 Point Games', medals.points6)}</Grid>}
                        {!!medals.points7 && <Grid item xs={6} md={3}>{StatItem('7 Point Games', medals.points7)}</Grid>}
                        {!!medals.points8 && <Grid item xs={6} md={3}>{StatItem('8 Point Games', medals.points8)}</Grid>}
                        {!!medals.points9 && <Grid item xs={6} md={3}>{StatItem('9 Point Games', medals.points9)}</Grid>}
                        {!!medals.points10 && <Grid item xs={6} md={3}>{StatItem('10 Point Games', medals.points10)}</Grid>}
                        <Grid item xs={12}>
                            <Box sx={{width: '100%', minHeight: '300px'}}>
                                <Bar options={getOptions('Points')}
                                    data={{
                                        labels: ['First Period', 'Second Period', 'Third Period', 'Overtime','Even Strength', 'Power Play', 'Short Handed'],
                                        datasets: [{
                                            label: 'Points', borderColor: 'rgb(255, 69, 0)', backgroundColor: 'rgba(255, 69, 0, 0.3)', data: pointStats,
                                        }],
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{padding: '10px', marginBottom: '15px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>{StatItem('Goals',medals.totalGoals)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('GPG',(medals.totalGoals/medals.gamesPlayed).toFixed(2))}</Grid>
                        {!!medals.goals1 && <Grid item xs={6} md={3}>{StatItem('1 Goal Games', medals.goals1)}</Grid>}
                        {!!medals.goals2 && <Grid item xs={6} md={3}>{StatItem('2 Goal Games', medals.goals2)}</Grid>}
                        {!!medals.goals3 && <Grid item xs={6} md={3}>{StatItem('3 Goal Games', medals.goals3)}</Grid>}
                        {!!medals.goals4 && <Grid item xs={6} md={3}>{StatItem('4 Goal Games', medals.goals4)}</Grid>}
                        {!!medals.goals5 && <Grid item xs={6} md={3}>{StatItem('5 Goal Games', medals.goals5)}</Grid>}
                        <Grid item xs={12}>
                            <Box sx={{width: '100%', minHeight: '300px'}}>
                                <Bar sx={{width: '100%'}} options={getOptions('Goals')}
                                    data={{
                                        labels: ['First Period', 'Second Period', 'Third Period', 'Overtime',
                                            'Even Strength', 'Power Play', 'Short Handed', 'Assisted', 'Unassisted'],
                                        datasets: [{
                                            label: 'Goals', borderColor: 'rgb(255, 69, 0)', backgroundColor: 'rgba(255, 69, 0, 0.3)', data: goalStats,
                                        }]
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                    
                <Box sx={{padding: '10px', marginBottom: '15px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(5px)'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>{StatItem('Assists',medals.totalAssists)}</Grid>
                        <Grid item xs={6} md={3}>{StatItem('APG',(medals.totalAssists/medals.gamesPlayed).toFixed(2))}</Grid>
                        {!!medals.assists1 && <Grid item xs={6} md={3}>{StatItem('1 Assist Games', medals.assists1)}</Grid>}
                        {!!medals.assists2 && <Grid item xs={6} md={3}>{StatItem('2 Assist Games', medals.assists2)}</Grid>}
                        {!!medals.assists3 && <Grid item xs={6} md={3}>{StatItem('3 Assist Games', medals.assists3)}</Grid>}
                        {!!medals.assists4 && <Grid item xs={6} md={3}>{StatItem('4 Assist Games', medals.assists4)}</Grid>}
                        {!!medals.assists5 && <Grid item xs={6} md={3}>{StatItem('5 Assist Games', medals.assists5)}</Grid>}
                        <Grid item xs={12}>
                            <Box sx={{width: '100%', minHeight: '300px'}}>
                                <Bar sx={{width: '100%'}} options={getOptions('Assists')}
                                    data={{
                                        labels: ['First Period', 'Second Period', 'Third Period', 'Overtime',
                                            'Even Strength', 'Power Play', 'Short Handed', 'Primary', 'Secondary'],
                                        datasets: [{
                                            label: 'Assists', borderColor: 'rgb(255, 69, 0)', backgroundColor: 'rgba(255, 69, 0, 0.3)',
                                            data: assistStats
                                        }],
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
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
                <TmhlTable rows={gameRows} columns={gamesColumns} hasFilter={true}></TmhlTable>
            </Box>
        }
    </Container>
}

export default Player;