import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { AppBar, Fade, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, upcomingGamesValue } from '../redux/upcomingGamesSlice';
import Navigation from './Navigation';
import { Box } from '@mui/system';
import Logo from '../assets/tmhl_logo.png';
import { toggleMenu } from '../redux/menuSlice';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const styles = {
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 999,
    },
    headerContainerMobile: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: 999,
    },
    headerContainerMobile: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        zIndex: 999,
    },
    gameBarMobile: {
        padding: 0,
        width: '90%',
        overflow: 'hidden',
    },
    gameBarLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '95%',
        width: '355px',
        overflow: 'hidden',
        backdropFilter: 'blur'
    },
    gameBarRight: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '95%',
        width: '355px',
        overflow: 'hidden',
        backdropFilter: 'blur'
    },
    listItemLeft: {
        width: '160px',
        padding: '0px',
        cursor: 'pointer'
    },
    listItemRight: {
        width: '160px',
        padding: '0px',
        cursor: 'pointer'
    },
    gameCardLeft: {
        marginLeft: '100px',
        paddingLeft: '100px'
    },
    gameCardRight: {
        marginRight: '10px'
    },
    logoContainer: {
        display: 'flex',
        height: '180px',
        width: '250px',
        paddingTop: '10px',
        justifyContent: 'center'
    },
    logoStyle: {
        height: '90%'
    },
    menuButton: {
        cursor: 'pointer',

        '&:hover': {
            color: '#ff6900'
        }
    },
};


function HeaderBar(props) {
    const classes = styles;
    const upcomingGames = useSelector(upcomingGamesValue);
    const dispatch = useDispatch();
    let history = useHistory();
    const [ appBarStyle, setappBarStyle ] = useState({
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        width: '100%',
        height: '200px'
    });
    const [ logoContainerStyle, setlogoContainerStyle ] = useState({
        display: 'flex',
        height: '160px',
        width: '250px',
        paddingTop: '10px',
        justifyContent: 'center',
        cursor: 'pointer'
    });
    
    useEffect(() => {
        dispatch(getGames());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setappBarStyle({
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
                width: '100%',
                height: '80px',
                transition: 'height .5s',
            });
            setlogoContainerStyle({
                display: 'flex',
                height: '80px',
                width: '250px',
                paddingTop: '10px',
                justifyContent: 'center',
                transition: 'height .5s',
                cursor: 'pointer'
            });
        } else {
            setappBarStyle({
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
                width: '100%',
                height: '200px',
                transition: 'height .5s',
            });
            setlogoContainerStyle({
                display: 'flex',
                height: '160px',
                width: '250px',
                paddingTop: '10px',
                justifyContent: 'center',
                transition: 'height .5s',
                cursor: 'pointer'
            });
        }
    }

    function goPage(page) {
        let route = `${page}`;
        history.push(route);
    }

    return (
        !(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ?
        <AppBar sx={appBarStyle} position="fixed">
            <Navigation style={{zIndex: 1000}}/>
            <Box sx={classes.headerContainer}>
                <Fade in={!(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)}>
                    <Box sx={classes.gameBarLeft}>
                        <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>Next 40+ Games</Typography>
                        <Box sx={{display: 'flex', alignContent: 'space-around', flexWrap: 'wrap', justifyContent: 'space-between', height: '180px'}}>
                            {upcomingGames.filter(game => game.league===2)?.map((game, i) => {
                                return <Box key={i} sx={classes.listItemLeft} onClick={() => goPage(`/game/${game.gamesid}`)}>
                                    <GameCard key={i}
                                        homeTeam={game.homeShortForm} homeScore={game.homeScore??0}
                                        awayTeam={game.awayShortForm} awayScore={game.awayScore??0} 
                                        date={moment(game.date).format('MMM DD')} time={game.time}
                                        homeColour={game.homePrimary} awayColour={game.awayPrimary}
                                        />
                                </Box>
                            })}
                        </Box>
                        <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40rosters')}>Rosters</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40standings')}>Standings</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40schedule')}>Schedule</Typography>
                        </Box>
                    </Box>
                </Fade>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={logoContainerStyle} onClick={() => goPage('/')}>
                        <img src={Logo} style={classes.logoStyle} alt="TMHL logo"/>
                    </Box>
                    <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Typography sx={classes.menuButton} onClick={() => {dispatch(toggleMenu())}}>Menu</Typography>
                    </Box>
                </Box>
                <Fade in={!(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)}>
                    <Box sx={classes.gameBarRight}>
                        <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>Next 19+ Games</Typography>
                        <Box sx={{display: 'flex', alignContent: 'space-around', flexWrap: 'wrap', justifyContent: 'space-between', height: '100%'}}>
                            {upcomingGames.filter(game => game.league===1).map((game, i) => {
                                return <Box key={i} sx={classes.listItemRight} onClick={() => goPage(`/game/${game.gamesid}`)}>
                                    <GameCard key={i}
                                        homeTeam={game.homeShortForm} homeScore={game.homeScore??0} 
                                        awayTeam={game.awayShortForm} awayScore={game.awayScore??0}
                                        date={moment(game.date).format('MMM DD')} time={game.time}
                                        homeColour={game.homePrimary} awayColour={game.awayPrimary}
                                    />
                                </Box>
                            })}
                        </Box>
                        <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19rosters')}>Rosters</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19standings')}>Standings</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19stats')}>Stats</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19schedule')}>Schedule</Typography>
                        </Box>
                    </Box>
                </Fade>
            </Box>
            
        </AppBar>
        :
        <AppBar sx={appBarStyle} position="fixed">
            <Navigation style={{zIndex: 1000}}/>
            <Box sx={classes.headerContainer}>
                <Fade in={(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)}>
                    <Box sx={classes.gameBarLeft}>
                        <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>40+ League</Typography>
                        <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40rosters')}>Rosters</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40standings')}>Standings</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/40schedule')}>Schedule</Typography>
                        </Box>
                    </Box>
                </Fade>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={logoContainerStyle}>
                        <img src={Logo} style={classes.logoStyle} alt="TMHL logo"/>
                    </Box>
                </Box>
                <Fade in={(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)}>
                    <Box sx={classes.gameBarRight}>
                        <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>19+ League</Typography>
                        <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19rosters')}>Rosters</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19standings')}>Standings</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19stats')}>Stats</Typography>
                            <Typography sx={classes.menuButton} onClick={() => goPage('/19schedule')}>Schedule</Typography>
                        </Box>
                    </Box>
                </Fade>
            </Box>            
        </AppBar>
    );
    
}

export default HeaderBar;