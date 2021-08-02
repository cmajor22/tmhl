import { Grid, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { Redirect, useHistory, withRouter, useRouteMatch } from 'react-router-dom';

function Navigation(props) {
    // const [aboutAnchor, setAboutAnchor] = React.useState(null);
    // const [nineteenAnchor, setNineteenAnchor] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    let history = useHistory();
    let match = useRouteMatch();

    const classes = {
        indentedButton: {
            paddingLeft: '15px'
        }
    }
  
    // const handleClick = (event) => {
    //     console.log(event)
    //     if(event.target.innerText==="ABOUT") {
    //         setAboutAnchor(event);
    //     }else if(event.target.innerText==="19+ SUNDAY DIVISION") {
    //         setNineteenAnchor(event);
    //     }
    // };
  
    // const handleClose = () => {
    //     clearAnchors();
    // };

    const toggleMenu = (status) => {
        setIsOpen(status);
    }

    function goPage(page) {
        let route = `${page}`;
        history.push(route);
        toggleMenu(false);
    }

    // function clearAnchors() {
    //     setAboutAnchor(null);
    //     setNineteenAnchor(null);
    // }

    return (
        // <Grid container>
        //     <Grid item xs={1}>
        //         <Button>Home</Button>
        //     </Grid>
        //     <Grid item xs={1}>
        //         <Button aria-controls="about" aria-haspopup="true" onClick={handleClick}>About</Button>
        //         <Menu id="about" aboutAnchor={aboutAnchor} keepMounted open={Boolean(aboutAnchor)} onClose={handleClose}>
        //             <MenuItem onClick={handleClose}>League Information</MenuItem>
        //             <MenuItem onClick={handleClose}>President's Message</MenuItem>
        //             <MenuItem onClick={handleClose}>Executive</MenuItem>
        //         </Menu>
        //     </Grid>
        //     <Grid item xs={1}>
        //         <Button aria-controls="nineteen" aria-haspopup="true" onClick={handleClick}>19+ Sunday Division</Button>
        //         <Menu id="nineteen" nineteenAnchor={nineteenAnchor} keepMounted open={Boolean(nineteenAnchor)} onClose={handleClose}>
        //             <MenuItem onClick={handleClose}>Rosters</MenuItem>
        //             <MenuItem onClick={handleClose}>Stats</MenuItem>
        //             <MenuItem onClick={handleClose}>Standings</MenuItem>
        //             <MenuItem onClick={handleClose}>Schedule</MenuItem>
        //         </Menu>
        //     </Grid>
        // </Grid>
        <div>
            <Button onClick={() => toggleMenu(true)}>Menu</Button>
            <Drawer anchor="menu" open={isOpen} onClose={() => toggleMenu(false)}>
                <List>
                    <ListItem button key="Home"><ListItemText primary="Home" onClick={() => {goPage('/')}}/></ListItem>
                    <Divider />
                    <ListItem button key="About" onClick={() => {goPage('/about')}}>
                        <ListItemText primary="About"/>
                    </ListItem>
                    <ListItem button key="League Information" onClick={() => {goPage('/leagueInfo')}}>
                        <ListItemText primary="League Information" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="President's Message" onClick={() => {goPage('/presidentsMessage')}}>
                        <ListItemText primary="President's Message" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Executive" onClick={() => {goPage('/executive')}}>
                        <ListItemText primary="Executive" style={classes.indentedButton}/></ListItem>
                    <Divider /> 
                    <ListItem button key="19+" onClick={() => {goPage('/19standings')}}><ListItemText primary="19+"/></ListItem>
                    <ListItem button key="Rosters" onClick={() => {goPage('/19rosters')}}><ListItemText primary="Rosters" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Stats" onClick={() => {goPage('/19stats')}}><ListItemText primary="Stats" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Standings" onClick={() => {goPage('/19standings')}}><ListItemText primary="Standings" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Schedule" onClick={() => {goPage('/19schedule')}}><ListItemText primary="Schedule" style={classes.indentedButton}/></ListItem>
                    <Divider /> 
                    <ListItem button key="40+" onClick={() => {goPage('/40standings')}}><ListItemText primary="40+"/></ListItem>
                    <ListItem button key="Rosters" onClick={() => {goPage('/40rosters')}}><ListItemText primary="Rosters" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Standings" onClick={() => {goPage('/40standings')}}><ListItemText primary="Standings" style={classes.indentedButton}/></ListItem>
                    <ListItem button key="Schedule" onClick={() => {goPage('/40schedule')}}><ListItemText primary="Schedule" style={classes.indentedButton}/></ListItem>
                    <Divider /> 
                    <ListItem button key="Rules" onClick={() => {goPage('/rules')}}><ListItemText primary="Rules"/></ListItem>
                    <Divider /> 
                    <ListItem button key="Sign Up" onClick={() => {goPage('/signUp')}}><ListItemText primary="Sign Up"/></ListItem>
                </List>
            </Drawer>

        </div>
    )
}

export default withRouter(Navigation);