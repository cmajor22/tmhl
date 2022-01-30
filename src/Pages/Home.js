import React from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
    }
}));

function Home(props) {
    const classes = useStyles();

    return <Box className={classes.mainContainer}>
        Home
    </Box>
}

export default Home;