import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import { AppBar, Fade, Grid, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, upcomingGamesValue } from '../redux/upcomingGamesSlice';
import Navigation from './Navigation';
import Logo from '../assets/tmhl_logo.png';
import { toggleMenu } from '../redux/menuSlice';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const styles = {
    gameBarLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '95%',
        maxWidth: '400px',
        minWidth: {xs: '180px'},
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
        maxWidth: '400px',
        minWidth: {xs: '180px'},
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
    logoStyle: {
        height: '90%'
    },
    menuButton: {
        cursor: 'pointer',

        '&:hover': {
            color: '#ff6900'
        }
    },
    logoContainerMobileStyle: {
        display: 'flex',
        height: '64px',
        cursor: 'pointer'
    }
};


function HeaderBar(props) {
    const classes = styles;
    const upcomingGames = useSelector(upcomingGamesValue);
    const dispatch = useDispatch();
    let history = useHistory();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const handleResize = () => {
        const width = window.innerWidth;
        setInnerWidth(width);
    };
    
    useEffect(() => {
        dispatch(getGames());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function goPage(page) {
        let route = `${page}`;
        history.push(route);
    }

    return (
        <AppBar sx={{display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: '5px', transition: 'height .5s'}} position="fixed">
            {innerWidth<860 &&
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '5px', paddingLeft: '5px', paddingRight: '5px'}}>
                    <Box sx={classes.logoContainerMobileStyle} onClick={() => goPage('/')}>
                        <img src={Logo} style={classes.logoStyle} alt="TMHL logo"/>
                    </Box>
                    <IconButton sx={{backgroundColor: 'rgba(255,255,255,.05)'}}><MenuIcon onClick={() => {dispatch(toggleMenu())}} sx={{cursor: 'pointer', fontSize: '44px'}} color="white"/></IconButton>
                </Box>
            }

            {innerWidth>=860 &&
            <img src={Logo} style={{
                position: 'fixed', height: scrollPosition > 50 ? '60px' : '140px',
                top: 10, left: '50%', transform: 'translateX(-50%)', transition: 'height .5s',
            }} alt="TMHL logo" onClick={() => {scrollPosition > 50 ? dispatch(toggleMenu()) : goPage('/')}}/>
            }

            <Navigation style={{zIndex: 1000}}/>
            <Grid container>
                {(innerWidth>=600 || !(scrollPosition > 50 && innerWidth<600)) && [
                    <Grid item xs={6} sm={5}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingLeft: '10px', paddingRight: '10px'}}>
                            <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '380px'}}>
                                <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>
                                    {(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ?
                                        '40+ League' : 'Next 40+ Games'
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>,
                    <Grid item xs={0} sm={2} />,
                    <Grid item xs={6} sm={5}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '10px', paddingRight: '10px'}}>
                            <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '380px'}}>
                                <Typography variant="h5" sx={{width: '100%', marginBottom: '3px'}}>
                                    {(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ?
                                        '19+ League' : 'Next 19+ Games'
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ]}
                <Grid item xs={6} sm={5}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Box sx={classes.gameBarLeft}>
                            <Fade in={!(scrollPosition > 50)} unmountOnExit>
                                <Grid container sx={{display: 'flex', alignContent: 'space-around', flexWrap: 'wrap', justifyContent: 'space-between'}} spacing={1}>
                                    {upcomingGames.filter(game => game.league===2)?.map((game, i) => {
                                        return <Grid item xs={12} sm={6} key={i} sx={classes.listItemLeft} onClick={() => goPage(`/game/${game.gamesid}`)}>
                                            <GameCard key={i}
                                                homeTeam={game.homeShortForm} homeScore={game.homeScore??0}
                                                awayTeam={game.awayShortForm} awayScore={game.awayScore??0} 
                                                date={moment(game.date).format('MMM DD')} time={game.time}
                                                homeColour={game.homePrimary} awayColour={game.awayPrimary}
                                                />
                                        </Grid>
                                    })}
                                </Grid>
                            </Fade>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={0} sm={2} />
                <Grid item xs={6} sm={5}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                        <Box sx={classes.gameBarRight}>
                            <Fade in={!(scrollPosition > 50)} unmountOnExit>
                                <Grid container sx={{display: 'flex', alignContent: 'space-around', flexWrap: 'wrap', justifyContent: 'space-between'}} spacing={1}>
                                    {upcomingGames.filter(game => game.league===1).map((game, i) => {
                                        return <Grid item xs={12} sm={6} key={i} sx={classes.listItemRight} onClick={() => goPage(`/game/${game.gamesid}`)}>
                                            <GameCard key={i}
                                                homeTeam={game.homeShortForm} homeScore={game.homeScore??0} 
                                                awayTeam={game.awayShortForm} awayScore={game.awayScore??0}
                                                date={moment(game.date).format('MMM DD')} time={game.time}
                                                homeColour={game.homePrimary} awayColour={game.awayPrimary}
                                            />
                                        </Grid>
                                    })}
                                </Grid>
                            </Fade>
                        </Box>
                    </Box>
                </Grid>
                {innerWidth>=600 && [
                    <Grid item xs={5}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingLeft: '10px', paddingRight: '10px'}}>
                            <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '380px'}}>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/40rosters')}>Rosters</Typography>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/40standings')}>Standings</Typography>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/40schedule')}>Schedule</Typography>
                            </Box>
                        </Box>
                    </Grid>,
                    <Grid item xs={0} sm={2}>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5px'}}>
                            {scrollPosition<=50 && <Typography sx={classes.menuButton} onClick={() => dispatch(toggleMenu())}>Menu</Typography>}
                        </Box>
                    </Grid>,
                    <Grid item xs={5}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', paddingLeft: '10px', paddingRight: '10px'}}>
                            <Box sx={{width: '100%', marginTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '380px'}}>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/19rosters')}>Rosters</Typography>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/19standings')}>Standings</Typography>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/19stats')}>Stats</Typography>
                                <Typography sx={classes.menuButton} onClick={() => goPage('/19schedule')}>Schedule</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ]}
            </Grid>
        </AppBar>
    );
}

export default HeaderBar;