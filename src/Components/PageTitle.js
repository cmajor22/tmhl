import React from 'react';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    titleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    accentBar: {
        width: '5px',
        height: '60px',
        marginRight: '5px',
        backgroundColor: theme.palette.tmhl.accent
    }
}));

function PageTitle(props) {
    const classes = useStyles();
    const { title, variant } = props;

    return (
        <Box className={classes.titleBox}>
            <Box className={classes.accentBar}/>
            <Typography variant={variant}>{title}</Typography>
        </Box>
    )
}

export default PageTitle;