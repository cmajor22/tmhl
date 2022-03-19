import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { AppBar, Button, IconButton, List, ListItem, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, upcomingGamesValue } from '../redux/upcomingGamesSlice';
import Navigation2 from './Navigation2';
import { Box } from '@mui/system';
import Logo from '../assets/tmhl_logo.png';
import { toggleMenu } from '../redux/menuSlice';
import { Menu } from '@mui/icons-material';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
        height: '80px'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 999,
    },
    gameBarLeft: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '6px',
        marginRight: '10px',
        marginLeft: '-50px',
        marginTop: '15px'
    },
    gameBarRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 0,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '6px',
        marginLeft: '10px',
        marginTop: '15px'
    },
    listItemLeft: {
        width: '120px',
        padding: '0px',
        marginLeft: '20px'
    },
    listItemRight: {
        width: '120px',
        padding: '0px',
        marginRight: '20px'
    },
    logoImage: {
        width: '120px',
    },
    menuButton: {
        height: '50px',
        width: '50px',
        marginTop: '15px',
        zIndex: 10050
    },
    gameCardLeft: {
        marginLeft: '100px',
        paddingLeft: '100px'
    },
    gameCardRight: {
        marginRight: '10px'
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
                transform: 'scale(0.7) translate(0%, -30%)'
            });
        } else {
            setlogoStyle({
                marginTop: '5px',
                transition: 'transform .35s ease-in-out',
                transform: 'scale(1)'
            });
        }
    }

    return <AppBar className={classes.appBar} position="fixed">
        <Navigation2 style={{zIndex: 1000}}/>
        <Box className={classes.headerContainer}>
            <IconButton onClick={() => {dispatch(toggleMenu())}} className={classes.menuButton}><Menu /></IconButton>
            <List className={classes.gameBarLeft}>
                {upcomingGames.filter(game => game.league===2)?.reverse().map((game) => {
                    return <ListItem key={game.gamesId} className={classes.listItemLeft}>
                        <GameCard
                            homeTeam={game.homeTeam} homeScore={game.homeScore??0}
                            awayTeam={game.awayTeam} awayScore={game.awayScore??0} 
                            date={moment(game.date).format('MMM DD')} time={game.time}/>
                    </ListItem>
                })}
            </List>
            <img src={Logo} className={classes.logoImage} style={logoStyle}/>
            <List className={classes.gameBarRight}>
                {upcomingGames.filter(game => game.league===1).map((game) => {
                    return <ListItem key={game.gamesId} className={classes.listItemRight}>
                        <GameCard className={classes.gameCardRight}
                            homeTeam={game.homeTeam} homeScore={game.homeScore??0} 
                            awayTeam={game.awayTeam} awayScore={game.awayScore??0}
                            date={moment(game.date).format('MMM DD')} time={game.time}/>
                    </ListItem>
                })}
            </List>
        </Box>
    </AppBar>
    
}

export default HeaderBar;