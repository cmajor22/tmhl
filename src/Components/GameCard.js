import React from 'react';
import { Grid, Card, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gameCard: {
        width: '120px'
    }
}));

function GameCard(props) {
    const classes = useStyles();

    return (
        <Box square elevation={1} className={classes.gameCard}>
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