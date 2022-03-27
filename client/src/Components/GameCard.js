import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const styles = {
    gameCard: {
        width: '100%'
    },
    teamName: {
        fontSize: '14px'
    },
    score: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    },
    time: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    }
};

function GameCard(props) {
    const classes = styles;

    return (
        <Box square elevation={1} sx={classes.gameCard}>
            <Grid container alignItems="center">
                <Grid item xs={7}>
                    <Typography sx={classes.teamName}>{props.homeTeam}</Typography>
                    <Typography sx={classes.teamName}>{props.awayTeam}</Typography>
                </Grid>
                {(props.homeScore !== 0 || props.awayScore !== 0) &&
                    <Grid item xs={5}>
                        <Typography sx={classes.score}>{props.homeScore}</Typography>
                        <Typography sx={classes.score}>{props.awayScore}</Typography>
                    </Grid>
                }
                {(props.homeScore === 0 && props.awayScore === 0) &&
                    <Grid item xs={5}>
                        <Typography sx={classes.time}>{props.date}</Typography>
                        <Typography sx={classes.time}>{props.time}</Typography>
                    </Grid>
                }
            </Grid>
        </Box>
    )
}

export default GameCard;