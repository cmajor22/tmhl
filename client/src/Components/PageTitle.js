import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
    titleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    accentBar: {
        width: '5px',
        height: '60px',
        marginRight: '5px',
        backgroundColor: (theme) => theme.palette.tmhl.accent
    }
};

function PageTitle(props) {
    const classes = styles;
    const { title, variant } = props;

    return (
        <Box sx={classes.titleBox}>
            <Box sx={classes.accentBar}/>
            <Typography variant={variant}>{title}</Typography>
        </Box>
    )
}

export default PageTitle;