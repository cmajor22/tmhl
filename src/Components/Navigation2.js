import { Grid, Drawer, ListItem, ListItemText,
    Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import { toggleMenu } from '../redux/menuSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '800px'
    },
    drawerContent: {
        height:'100%',
        minWidth: '400px',
        backgroundColor: theme.palette.tmhl.medium
    },
    menuSingleItem: {
        padding: '12px 0px 12px 15px',
        cursor: 'pointer',
    },
    menuMultiItem: {
        cursor: 'pointer',
        outlined: 'false',
    },
}));

function Navigation(props) {
    const classes = useStyles();
    const isOpen = useSelector(state => state.menu.isOpen);
    const dispatch = useDispatch();
    let history = useHistory();

    const menuItems = [
        {label: "About", target: null, children: [
            {label: "League Information", target: "/leagueInfo"},
            {label: "President's Message", target: "/presidentsMessage"},
            {label: "Executive", target: "/executive"},
        ]},
        {label: "19+ Sunday", target: null, children: [
            {label: "Rosters", target: "/19rosters"},
            {label: "Stats", target: "/19stats"},
            {label: "Standings", target: "/19standings"},
            {label: "Schedule", target: "/19schedule"},
        ]},
        {label: "40+ Tuesday", target: null, children: [
            {label: "Rosters", target: "/40rosters"},
            {label: "Standings", target: "/40standings"},
            {label: "Schedule", target: "/40schedule"},
        ]},
        {label: "Rules", target: "/rules", children: []},
        {label: "Sign Up", target: "signUp", children: []},
    ];

    function goPage(page) {
        let route = `${page}`;
        history.push(route);
        dispatch(toggleMenu());
    }

    return (
            <Drawer anchor="left" open={isOpen} onClose={() => dispatch(toggleMenu())} className={classes.drawer}>
                <Box className={classes.drawerContent}>
                    <Paper elevation={0} square className={classes.menuSingleItem}>
                        <Grid container>
                            <Grid item xs={11}>
                                <Typography onClick={() => {goPage('/home')}}>Home</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <CloseIcon onClick={() => {dispatch(toggleMenu())}}/>
                            </Grid>
                        </Grid>
                    </Paper>
                    {menuItems.map((item) => {
                        if(item.children.length === 0) {
                            return <Paper key={item.label} elevation={0} square className={classes.menuSingleItem}>
                                <Typography onClick={() => {goPage(item.target)}}>{item.label}</Typography>
                            </Paper>
                        }else{
                            return <Accordion key={item.label} elevation={0} square className={classes.menuMultiItem}
                            sx={{
                                '&:before': {
                                    display: 'none',
                                }
                            }}>
                                <AccordionSummary>
                                    <Typography>{item.label}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {item.children.map((subItem) => {
                                        return <ListItem button key={subItem.label} onClick={() => {goPage(subItem.target)}}>
                                            <ListItemText primary={subItem.label}/>
                                        </ListItem>;
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        }
                    })}
                    <Paper elevation={0} square className={classes.menuSingleItem}></Paper>
                </Box>
            </Drawer>
    )
}

export default withRouter(Navigation);