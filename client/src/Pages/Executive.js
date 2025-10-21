import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
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
    {playerName: "Tim Osmund", teamName: "President"},
    {playerName: "Bryon Henderson", teamName: "Vice President"},
    {playerName: "Doug Williamson", teamName: "Executive"},
    {playerName: "Dave Newson", teamName: "Executive"},
    {playerName: "Casey Major", teamName: "Executive"},
];

function Executive(props) {
    const classes = styles;
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);

    function personBox(person) {
        return <Box key={`${person.playerName}-${person.teamName}`} sx={classes.personLeagueCard}>
            <Box>
                <PersonIcon sx={classes.personCardIcon}></PersonIcon>
            </Box>
            <Box sx={classes.personCardContent}>
                <Typography variant="subtitle1">{person.playerName}</Typography>
                <Typography variant="subtitle2">{person.teamName}</Typography>
            </Box>
        </Box>;
    }
    
    useEffect(() => {
        dispatch(getCaptains());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return <Container>
        <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px', marginBottom: '15px'}}>
            <PageTitle title="Executive" variant="h2"/>
        </Box>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                {
                    personList.map((person) => {
                        return personBox(person);
                    })
                }
            </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                    <PageTitle title="40+ Captains" variant="h4"/>
                    {rosters.captains.map((person) => {
                        if(person.leaguesId===2) {
                            return personBox(person);
                        }
                        return null
                    })}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(5px)', padding: '5px'}}>
                    <PageTitle title="19+ Captains" variant="h4"/>
                    {rosters.captains.map((person, i) => {
                        if(person.leaguesId===1) {
                            return personBox(person);
                        }
                        return null
                    })}
                </Box>
            </Grid>
        </Grid>
        <br />
    </Container>
}

export default Executive;