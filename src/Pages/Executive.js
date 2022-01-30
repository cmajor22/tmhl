import React, { Fragment } from 'react';
import { Box, Card, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({
    personCard: {
        width: '200px',
        padding: '5px',
        display: 'flex'
    },
    personCardIcon: {
        fontSize: '50px'
    },
    personCardContent: {
        paddingLeft: '7px'
    }
}));

const personList = [
    {name: "Tim Osmund", title: "President"},
    {name: "Doug Williamson", title: "Executive"},
    {name: "Dave Newson", title: "Executive"},
    {name: "Casey Major", title: "Executive"},
]

function Executive(props) {
    const classes = useStyles();

    return <Fragment>
        {
            personList.map((person) => {
                return [
                    <Card className={classes.personCard}>
                        <Box>
                            <PersonIcon className={classes.personCardIcon}></PersonIcon>
                        </Box>
                        <Box className={classes.personCardContent}>
                            <Typography variant="subtitle1">{person.name}</Typography>
                            <Typography variant="subtitle2">{person.title}</Typography>
                        </Box>
                    </Card>,
                    <br />]
            })
        }
    </Fragment>
}

export default Executive;