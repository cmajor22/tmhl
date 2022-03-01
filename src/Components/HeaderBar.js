import React, { useEffect } from 'react';
import GameCard from './GameCard';
import { AppBar, List, ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, upcomingGamesValue } from '../redux/upcomingGamesSlice'
import Navigation2 from './Navigation2';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
    },
    gameBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
        overflow: 'auto',
        paddingBottom: '6px',
    },
    listItem: {
        width: '120px',
        padding: '0px',
        margin: '0px'
    }
}));


function HeaderBar(props) {
    const classes = useStyles();
    const upcomingGames = useSelector(upcomingGamesValue);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getGames());
    }, [])

    return <AppBar className={classes.appBar}>
        <Navigation2 />
        <List disableGutters={true} className={classes.gameBar}>
            {upcomingGames.map((game) => {
                return <ListItem className={classes.listItem}>
                    <GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} />
                </ListItem>
            })}
        </List>
    </AppBar>
    
}

export default HeaderBar;