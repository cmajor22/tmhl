import React, { useEffect, useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { gameAway, gameGoals, gameHome, gamePenalties, gamesValue } from '../redux/gamesSlice';

const useStyles = makeStyles((theme) => ({
    
}));

function Game(props) {
    const classes = useStyles();
    const { gameId } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(gamesValue);
    var [goalsArray, setgoalsArray] = useState(
        [{home: '', away: ''},{home: 0, away: 0},{home: 0, away: 0},{home: 0, away: 0},{home: 0, away: 0}]
    );
    
    useEffect(() => {
        dispatch(gameGoals({gameId}));
        dispatch(gamePenalties({gameId}));
        dispatch(gameHome({gameId}));
        dispatch(gameAway({gameId}));
    }, []);
    
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

        setgoalsArray(tempGoalsArray);
    }, [game]);

    return <Box>
        <Grid container>
            <Grid item xs={3}>
                <Grid container>
                    <Grid item xs={12}>{goalsArray[0].home}</Grid>
                    <Grid item xs={12}>&nbsp;</Grid>
                    <Grid item xs={12}>{goalsArray[1].home + goalsArray[2].home + goalsArray[3].home}</Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={3}>{goalsArray[1].home}</Grid>
                    <Grid item xs={3}>{goalsArray[2].home}</Grid>
                    <Grid item xs={3}>{goalsArray[3].home}</Grid>
                    <Grid item xs={3}>{goalsArray[1].home + goalsArray[2].home + goalsArray[3].home}</Grid>
                    <Grid item xs={3}>{goalsArray[1].away}</Grid>
                    <Grid item xs={3}>{goalsArray[2].away}</Grid>
                    <Grid item xs={3}>{goalsArray[3].away}</Grid>
                    <Grid item xs={3}>{goalsArray[1].away + goalsArray[2].away + goalsArray[3].away}</Grid>
                    <Grid item xs={3}>1</Grid>
                    <Grid item xs={3}>2</Grid>
                    <Grid item xs={3}>3</Grid>
                    <Grid item xs={3}>F</Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container>
                    <Grid item xs={12}>&nbsp;</Grid>
                    <Grid item xs={12}>{goalsArray[0].away}</Grid>
                    <Grid item xs={12}>{goalsArray[1].away + goalsArray[2].away + goalsArray[3].away}</Grid>
                </Grid>

            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={8}>Player</Grid>
                    <Grid item xs={1}>P</Grid>
                    <Grid item xs={1}>G</Grid>
                    <Grid item xs={1}>A</Grid>
                    <Grid item xs={1}>PIM</Grid>
                    {game.gameHome.map((statLine) => {
                        return [
                            <Grid item xs={8}>{statLine.playerName}</Grid>,
                            <Grid item xs={1}>{statLine.points}</Grid>,
                            <Grid item xs={1}>{statLine.goals}</Grid>,
                            <Grid item xs={1}>{statLine.assists+statLine.assists1}</Grid>,
                            <Grid item xs={1}>{statLine.penalties}</Grid>
                        ];
                        
                    })}
                </Grid>
            </Grid>
            <Grid item xs={4}>
                
            </Grid>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={8}>Player</Grid>
                    <Grid item xs={1}>P</Grid>
                    <Grid item xs={1}>G</Grid>
                    <Grid item xs={1}>A</Grid>
                    <Grid item xs={1}>PIM</Grid>
                    {game.gameAway.map((statLine) => {
                        return [
                            <Grid item xs={8}>{statLine.playerName}</Grid>,
                            <Grid item xs={1}>{statLine.points}</Grid>,
                            <Grid item xs={1}>{statLine.goals}</Grid>,
                            <Grid item xs={1}>{statLine.assists+statLine.assists1}</Grid>,
                            <Grid item xs={1}>{statLine.penalties}</Grid>
                        ];
                        
                    })}
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default Game;