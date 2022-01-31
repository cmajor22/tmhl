import React, { useEffect } from 'react';
import { Grid, Card, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { gamesData, gamesValue } from '../redux/gamesSlice';

const useStyles = makeStyles((theme) => ({
    gameCard: {
        width: '120px'
    }
}));

function GameCard(props) {
    const classes = useStyles();

    return (
        <Box square elevation={1} className={classes.gameCard}>
            <Typography>{props.gamesId}</Typography>
            <Grid container>
                <Grid item xs={7}>
                    {props.homeTeam}
                </Grid>
                <Grid item xs={5}>
                    {props.homeScore}
                </Grid>
                <Grid item xs={7}>
                    {props.awayTeam}
                </Grid>
                <Grid item xs={5}>
                    {props.awayScore}
                </Grid>
            </Grid>
        </Box>
    )
}

export default GameCard;