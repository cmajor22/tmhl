import React from 'react';
import GameCard from './GameCard';
import { Grid } from '@material-ui/core';

function HeaderBar(props) {
    const games = [
        {homeTeam: 'Team 1', homeScore: '4', awayTeam: 'Team 2', awayScore: '2'},
        {homeTeam: 'Team 3', homeScore: '4', awayTeam: 'Team 4', awayScore: '2'},
        {homeTeam: 'Team 5', homeScore: '4', awayTeam: 'Team 6', awayScore: '2'},
    ]

    return (
        <div>
            <Grid container>
            {games.map((game) => {
                return <Grid item xs={2}>
                    <GameCard homeTeam={game.homeTeam} homeScore={game.homeScore} awayTeam={game.awayTeam} awayScore={game.awayScore} />
                </Grid>;
            })}
            </Grid>
        </div>
    )
}

export default HeaderBar;