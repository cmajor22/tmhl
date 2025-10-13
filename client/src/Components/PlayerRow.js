import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
    playerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    playerNumber: {
        opacity: '0.4',
        width: '26px',
        marginRight: '3px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    playerExtra: {
        opacity: '0.4',
        marginLeft: '2px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

function PlayerRow(props) {
    const classes = styles;
    const { playerName, playerNumber, isCaptain, isGoalie } = props;

    function returnCaptain(isCaptain) {
        return isCaptain ? <Typography sx={classes.playerExtra}>(C)</Typography> : '';
    }

    function returnGoalie(isGoalie) {
        return isGoalie ? <Typography sx={classes.playerExtra}>(G)</Typography> : '';
    }

    return (
        <Box sx={classes.playerItem}>
            <Typography sx={classes.playerNumber}>{playerNumber}</Typography>
            <Typography>{playerName}</Typography>
            {returnCaptain(isCaptain)}
            {returnGoalie(isGoalie)}
        </Box>
    )
}

export default PlayerRow;