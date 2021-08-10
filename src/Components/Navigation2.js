import { Grid, Button, Drawer, ListItem, ListItemText,
    Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';
import { toggleMenu } from '../redux/menuSlice';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    menuSingleItem: {
        padding: '12px 0px 12px 15px',
        cursor: 'pointer',
        borderTop: 'solid 1px rgb(222, 222, 222);',
    },
    menuMultiItem: {
        cursor: 'pointer',
        outlined: 'false'
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
        <Fragment>
            <Button onClick={() => dispatch(toggleMenu())}>Menu</Button>
            <Drawer anchor="left" open={isOpen} onClose={() => dispatch(toggleMenu())} className={classes.drawer}>
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
                        return <Paper elevation={0} square className={classes.menuSingleItem}>
                            <Typography onClick={() => {goPage(item.target)}}>{item.label}</Typography>
                        </Paper>
                    }else{
                        return <Accordion elevation={0} square className={classes.menuMultiItem}>
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
            </Drawer>
        </Fragment>
    )
}

export default withRouter(Navigation);