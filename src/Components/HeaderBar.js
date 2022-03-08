import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { AppBar, List, ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, upcomingGamesValue } from '../redux/upcomingGamesSlice'
import Navigation2 from './Navigation2';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box } from '@mui/system';
import Logo from '../assets/tmhl_logo.png'

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
        height: '70px'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 999
    },
    gameBarLeft: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '6px',
        marginRight: '10px'
    },
    gameBarRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '6px',
        marginLeft: '10px'
    },
    listItem: {
        width: '120px',
        padding: '0px',
        margin: '0px'
    },
    logoImage: {
        width: '120px',
    }
}));


function HeaderBar(props) {
    const classes = useStyles();
    const upcomingGames = useSelector(upcomingGamesValue);
    const dispatch = useDispatch();
    const [ logoStyle, setlogoStyle ] = useState({
        marginTop: '5px',
        transition: 'transform .35s ease-in-out',
        transform: 'scale(1)'
    });
    
    useEffect(() => {
        dispatch(getGames());
    }, []);

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setlogoStyle({
                marginTop: '5px',
                transition: 'transform .35s ease-in-out',
                transform: 'scale(0.5) translate(0%, -50%)'
            });
        } else {
            setlogoStyle({
                marginTop: '5px',
                transition: 'transform .35s ease-in-out',
                transform: 'scale(1)'
            });
        }
    }

    return <AppBar className={classes.appBar}>
        <Navigation2 style={{zIndex: 1000}}/>
        <Box className={classes.headerContainer}>
            <List disableGutters={true} className={classes.gameBarLeft}>
                {upcomingGames.filter(game => game.league===2).map((game) => {
                    return <ListItem className={classes.listItem}>
                        <GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} />
                    </ListItem>
                })}
            </List>
            <img src={Logo} className={classes.logoImage} style={logoStyle}/>
            <List disableGutters={true} className={classes.gameBarRight}>
                {upcomingGames.filter(game => game.league===1).map((game) => {
                    return <ListItem className={classes.listItem}>
                        <GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} />
                    </ListItem>
                })}
            </List>
        </Box>
    </AppBar>
    
}

export default HeaderBar;