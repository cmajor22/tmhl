import React, { useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PageTitle from '../Components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getCaptains, rostersValue } from '../redux/rostersSlice';

const styles = {
    personCard: {
        padding: '5px',
        display: 'flex',
    },
    personLeagueCard: {
        marginTop: '5px',
        padding: '5px',
        display: 'flex',
    },
    personCardIcon: {
        fontSize: '50px'
    },
    personCardContent: {
        paddingLeft: '7px'
    },
    leagueLeaders: {
        padding: '5px'
    }
};

const personList = [
    {name: "Tim Osmund", title: "President"},
    {name: "Doug Williamson", title: "Executive"},
    {name: "Dave Newson", title: "Executive"},
    {name: "Casey Major", title: "Executive"},
];

function Executive(props) {
    const classes = styles;
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    
    useEffect(() => {
        dispatch(getCaptains());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return <Container>
        <PageTitle title="Executive" variant="h2"/>
        <br />
        <Grid container spacing={3}>
            {
                personList.map((person) => {
                    return <Grid item xs={12}>
                        <Paper sx={classes.personCard} elevation={3}>
                            <Box>
                                <PersonIcon sx={classes.personCardIcon}></PersonIcon>
                            </Box>
                            <Box sx={classes.personCardContent}>
                                <Typography variant="subtitle1">{person.name}</Typography>
                                <Typography variant="subtitle2">{person.title}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                })
            }
            <Grid item xs={12}>
                <Paper elevation={3} sx={classes.leagueLeaders}>
                    <PageTitle title="40+ Captains" variant="h4"/>
                    {rosters.captains.map((person) => {
                        if(person.leaguesId===2) {
                            return <Paper sx={classes.personLeagueCard} elevation={3}>
                                <Box>
                                    <PersonIcon sx={classes.personCardIcon}></PersonIcon>
                                </Box>
                                <Box sx={classes.personCardContent}>
                                    <Typography variant="subtitle1">{person.playerName}</Typography>
                                    <Typography variant="subtitle2">{person.teamName}</Typography>
                                </Box>
                            </Paper>
                        }
                        return null
                    })}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3} sx={classes.leagueLeaders}>
                    <PageTitle title="19+ Captains" variant="h4"/>
                    {rosters.captains.map((person) => {
                        if(person.leaguesId===1) {
                            return <Paper sx={classes.personLeagueCard} elevation={3}>
                                <Box>
                                    <PersonIcon sx={classes.personCardIcon}></PersonIcon>
                                </Box>
                                <Box sx={classes.personCardContent}>
                                    <Typography variant="subtitle1">{person.playerName}</Typography>
                                    <Typography variant="subtitle2">{person.teamName}</Typography>
                                </Box>
                            </Paper>
                        }
                        return null
                    })}
                </Paper>
            </Grid>
        </Grid>
        <br />
    </Container>
}

export default Executive;