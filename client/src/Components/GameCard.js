import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const styles = {
    gradientBox: {
        width: '100%',
        padding: '2px',
        borderRadius: '5px',
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        display: 'inline-block',
    },
    gradientBackdrop: {
        background: '#1e1e1e',
        borderRadius: '5px',
    },
    gameCard: {
        padding: '3px 5px 3px 5px',
        borderRadius: '5px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur',
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
    const homeColour = props.homeColour;
    const awayColour = props.awayColour;

    return (
        <Box sx={{
            width: '100%',
            padding: '2px',
            borderRadius: '5px',
            background: `linear-gradient(to bottom, #${homeColour}, rgba(50, 50, 50, 0.5) 48%, rgba(50, 50, 50, 0.5) 52%, #${awayColour})`,
            display: 'inline-block',
        }}>
            <Box sx={classes.gradientBackdrop}>
                <Box elevation={1} sx={classes.gameCard}>
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
            </Box>
        </Box>
    )
}

export default GameCard;