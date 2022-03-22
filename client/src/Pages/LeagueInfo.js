import React, { Fragment } from 'react';
import { Box, Card, Grid, List, ListItem, Paper, Typography, ListItemIcon, ListItemText, Link, Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowRight } from '@mui/icons-material';
import PageTitle from '../Components/PageTitle';

const styles = {
    cardTitle: {
        paddingTop: '10px',
        marginLeft: '5px'
    },
    cardContent: {
        marginLeft: '5px',
        marginRight: '5px'
    },
    listItemIcon: {
        width: (theme) => theme.spacing(3),
        minWidth: (theme) => theme.spacing(3),
        marginTop: '4px'
    },
    leagueInfo: {
        padding: '5px'
    }
};

function LeagueInfo(props) {
    const classes = styles;

    return <Container>
        <PageTitle title="League Information" variant="h2"/>
        <br />
        <Typography>
            The Tottenham Men’s Hockey League is celebrating 40 years of providing Men’s recreational hockey.  
            The league’s focus is to provide fun, recreational hockey for men over 19 years of age in Tottenham and surrounding area. 
            The league is very well organized with 2 divisions, referees, time keepers, jerseys and full statistics all supported by our website. 
            The teams are drafted each year from a ranking system, which ensures competitively balanced teams.  
            This also provides the opportunity to meet and play with new people each year.  We have 14 teams, with 1 captain per team and a 5 man executive.  
            Games are played at the Tottenham Community Center.  The season starts in early September with playoffs in late February/March using a 26 game schedule. 
            The last night of our season includes our Championship games and our end of year banquet.
        </Typography>

        <br />

        <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
                <Paper elevation={3} sx={classes.leagueInfo}>
                    <PageTitle title="19+ Division" variant="h4"/>
                    <Box sx={classes.cardContent}>
                        <List>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="Open to men 19 years of age and older" />
                            </ListItem>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="6 to 8 teams" />
                            </ListItem>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="Games are Sunday nights at 7:00, 8:00, and 9:00pm" />
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Paper elevation={3} sx={classes.leagueInfo}>
                    <PageTitle title="40+ Division" variant="h4"/>
                    <Box sx={classes.cardContent}>
                        <List>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="Open to men 40 years of age and older"/>
                            </ListItem>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="6 teams" />
                            </ListItem>
                            <ListItem disablePadding alignItems="flex-start">
                                <ListItemIcon sx={classes.listItemIcon}><ArrowRight /></ListItemIcon>
                                <ListItemText primary="Games are Tuesday nights at 8:00, 9:00 and 10:00" />
                            </ListItem>
                        </List>
                    </Box>
                </Paper>
            </Grid>
        </Grid>

        <br />
 
        <Typography>Registration is approximately $420</Typography>

        <br />

        <Typography>If you are interested in joining our league please <Link href="/signUp">sign up</Link> and fill out your information and a league representative will contact you.</Typography>
        <br /><br />
    </Container>
}

export default LeagueInfo;