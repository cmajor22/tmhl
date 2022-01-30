import React, { Fragment } from 'react';
import { Card, Grid, Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    
}));

function LeagueInfo(props) {
    const classes = useStyles();

    return <Fragment>
        <br /><br />
        <Typography>
            The Tottenham Men’s Hockey League is celebrating 40 years of providing Men’s recreational hockey.  
            The league’s focus is to provide fun, recreational hockey for men over 19 years of age in Tottenham and surrounding area. 
            The league is very well organized with 2 divisions, referees, time keepers, jerseys and full statistics all supported by our website. 
            The teams are drafted each year from a ranking system, which ensures competitively balanced teams.  
            This also provides the opportunity to meet and play with new people each year.  We have 14 teams, with 1 captain per team and a 5 man executive.  
            Games are played at the Tottenham Community Center.  The season starts in early September with playoffs in late February/March using a 26 game schedule. 
            The last night of our season includes our Championship games and our end of year banquet.
        </Typography>

        <br /><br />

        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Card>
                    <Typography>19+ Division</Typography>
                    <Typography>Open to men 19 years of age and older</Typography>
                    <Typography>8 teams</Typography>
                    <Typography>Games are Sunday nights at 6:30, 7:30, 8:30 and 9:30pm</Typography>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Typography>40+ Division</Typography>
                    <Typography>Open to men 40 years of age and older</Typography>
                    <Typography>6 teams</Typography>
                    <Typography>Games are Tuesday nights at 8:00, 9:00 and 10:00pm</Typography>
                </Card>
            </Grid>
        </Grid>

        <br /><br />
 
        <Typography>Registration is approximately $420</Typography>

        <br /><br />

        <Typography>If you are interested in joining our league please go to “sign up” and fill out your information and a league representative will contact you.</Typography>
    </Fragment>
}

export default LeagueInfo;