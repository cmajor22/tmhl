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
    const { title, variant, primaryColour, shortForm } = props;

    if(props.shortForm) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '3px',
                background: `linear-gradient(to right, #${primaryColour}CC, #${primaryColour}88)`}}>
                <Box sx={{height: '32px', width: '32px', marginRight: '16px', display: 'flex', alignContent: 'center'}}>
                    <img src={`/assets/${shortForm}.svg`} alt="Team Logo"/>
                </Box>
                <Typography variant={variant}>{title}</Typography>
            </Box>
        )
    } else {
        return (
            <Box sx={classes.titleBox}>
                <Box sx={classes.accentBar}/>
                <Typography variant={variant}>{title}</Typography>
            </Box>
        )
    }
}

export default PageTitle;