import { Grid, Card } from '@material-ui/core';
import React from 'react';

function GameCard(props) {
    console.log(props)
    return (
        <Card>
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
        </Card>
    )
}

export default GameCard;