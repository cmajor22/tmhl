import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    gameCard: {
        width: '120px',
    }
}));

function GameCard(props) {
    const classes = useStyles();

    return (
        <Box square elevation={1} className={classes.gameCard}>
            <Grid container alignItems="center">
                <Grid item xs={7}>
                    <Typography className={classes.teamName}>{props.homeTeam}</Typography>
                    <Typography className={classes.teamName}>{props.awayTeam}</Typography>
                </Grid>
                {props.homeScore !== 0 || props.awayScore !== 0 &&
                    <Grid item xs={5}>
                        <Typography>{props.homeScore}</Typography>
                        <Typography>{props.awayScore}</Typography>
                    </Grid>
                }
                {props.homeScore === 0 && props.awayScore === 0 &&
                    <Grid item xs={5}>
                        <Typography>{props.time}</Typography>
                    </Grid>
                }
            </Grid>
        </Box>
    )
}

export default GameCard;