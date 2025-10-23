import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory } from "react-router-dom";

const styles = {
    playerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        cursor: 'pointer'
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
    const { playersId, playerName, playerNumber, isCaptain, isGoalie } = props;
    const history = useHistory();

    function returnCaptain(isCaptain) {
        return isCaptain ? <Typography sx={classes.playerExtra}>(C)</Typography> : '';
    }

    function returnGoalie(isGoalie) {
        return isGoalie ? <Typography sx={classes.playerExtra}>(G)</Typography> : '';
    }

    function playerClicked(playersId) {
        playersId && history.push(`/player/${playersId}`);
    }

    return (
        <Box sx={classes.playerItem} onClick={() => playerClicked(playersId)}>
            <Typography sx={classes.playerNumber}>{playerNumber}</Typography>
            <Typography>{playerName}</Typography>
            {returnCaptain(isCaptain)}
            {returnGoalie(isGoalie)}
        </Box>
    )
}

export default PlayerRow;