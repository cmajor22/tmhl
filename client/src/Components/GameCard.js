import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const styles = {
    gameCard: {
        width: '80%',
        margin: 'auto',
        marginTob: '-20px'
    },
    teamName: {
        fontSize: '14px'
    },
    teamNameMobile: {
        fontSize: '14px'
    },
    score: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    },
    scoreMobile: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    },
    time: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    },
    timeMobile: {
        fontSize: '14px',
        color: `#FFFFFF80`,
        textAlign: 'right'
    }
};

function GameCard(props) {
    const classes = styles;
    const {isMobile} = props;

    return (
        <Box square elevation={1} sx={classes.gameCard}>
        {!isMobile &&
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
        }
        {isMobile &&
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={4}>
                    <Typography sx={classes.timeMobile}>{props.date}, {props.time}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={classes.teamNameMobile}>{props.homeTeam}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={classes.scoreMobile}>
                        {(props.homeScore !== 0 || props.awayScore !== 0 || props.isUploaded === 1) && props.homeScore}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={classes.teamNameMobile}>{props.awayTeam}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography sx={classes.scoreMobile}>
                        {(props.homeScore !== 0 || props.awayScore !== 0 || props.isUploaded ===1) && props.awayScore}
                    </Typography>
                </Grid>
            </Grid>
        }
        </Box>
    )
}

export default GameCard;