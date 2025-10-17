import { Drawer, ListItemText, ListItemIcon, List, ListItemButton, Collapse } from '@mui/material';
import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { toggleMenu } from '../redux/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Logo from '../assets/tmhl_logo.png';

const styles = {
    drawer: {
        width: '800px'
    },
    drawerContent: {
        height:'100%',
        minWidth: '400px',
        backgroundColor: (theme) => theme.palette.tmhl.medium
    },
    menuSingleItem: {
        padding: '12px 0px 12px 15px',
        cursor: 'pointer',
    },
    menuMultiItem: {
        cursor: 'pointer',
        outlined: 'false',
        '&:before': {
            display: 'none',
        }
    },
    logoMobile: {
        height: '100px',
        marginTop: '10px',
        marginLeft: '10px'
    },
};

function Navigation(props) {
    const classes = styles;
    const isOpen = useSelector(state => state.menu.isOpen);
    const dispatch = useDispatch();
    let history = useHistory();
    const [isAboutOpen, setisAboutOpen] = React.useState(false);
    const [is19Open, setis19Open] = React.useState(false);
    const [is40Open, setis40Open] = React.useState(false);

    const handleAboutClick = () => {
        setisAboutOpen(!isAboutOpen);
    };

    const handle19Click = () => {
        setis19Open(!is19Open);
    };

    const handle40Click = () => {
        setis40Open(!is40Open);
    };

    const collapseAll = () => {
        setisAboutOpen(false);
        setis19Open(false);
        setis40Open(false);
    }

    function goPage(page) {
        collapseAll();
        let route = `${page}`;
        history.push(route);
        dispatch(toggleMenu());
    }

    return (
        <Drawer anchor="left" open={isOpen} onClose={() => dispatch(toggleMenu())} sx={classes.drawer}>
            <Box sx={classes.drawerContent}>
                <img src={Logo} style={classes.logoMobile} alt="TMHL logo"/>
                <List>
                    <ListItemButton onClick={() => {goPage('/home')}}>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => {handleAboutClick()}}>
                        <ListItemText>About</ListItemText>
                    </ListItemButton>
                    <Collapse in={isAboutOpen} timeout="auto" unmountOnExit>
                        <List>
                            <ListItemButton onClick={() => {goPage('/leagueInfo')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>League Information</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/executive')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Executive</ListItemText>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {handle19Click()}}>
                        <ListItemText>19 Plus</ListItemText>
                    </ListItemButton>
                    <Collapse in={is19Open} timeout="auto" unmountOnExit>
                        <List>
                            <ListItemButton onClick={() => {goPage('/19rosters')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Rosters</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/19standings')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Standings</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/19stats')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Stats</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/19schedule')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Schedule</ListItemText>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {handle40Click()}}>
                        <ListItemText>40 Plus</ListItemText>
                    </ListItemButton>
                    <Collapse in={is40Open} timeout="auto" unmountOnExit>
                        <List>
                            <ListItemButton onClick={() => {goPage('/40rosters')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Rosters</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/40standings')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Standings</ListItemText>
                            </ListItemButton>
                            <ListItemButton onClick={() => {goPage('/40schedule')}}>
                                <ListItemIcon></ListItemIcon>
                                <ListItemText>Schedule</ListItemText>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton onClick={() => {goPage('/rules')}}>
                        <ListItemText>Rules</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => {goPage('/signUp')}}>
                        <ListItemText>Sign Up</ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => dispatch(toggleMenu())}>
                        <ListItemText>Close</ListItemText>
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    )
}

export default withRouter(Navigation);