import React from 'react';
import GameCard from './GameCard';
import { Grid, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    const games = [
        {homeTeam: 'Team 1', homeScore: '4', awayTeam: 'Team 2', awayScore: '2'},
        {homeTeam: 'Team 3', homeScore: '4', awayTeam: 'Team 4', awayScore: '2'},
        {homeTeam: 'Team 5', homeScore: '4', awayTeam: 'Team 6', awayScore: '2'},
        {homeTeam: 'Team 5', homeScore: '4', awayTeam: 'Team 6', awayScore: '2'},
    ]

    return <List disableGutters={true} className={classes.gameBar}>
            {games.map((game) => {
                return <ListItem className={classes.listItem}><GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} /></ListItem>
            })}
        </List>
        {/* <div>
            <Grid container>
            {games.map((game) => {
                return <Grid item xs={6} m={4} lg={2}>
                    <GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} />
                </Grid>;
            })}
            </Grid>
        </div> */}
    
}

export default HeaderBar;