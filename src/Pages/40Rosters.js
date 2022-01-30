import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { get40, rostersValue } from '../redux/rostersSlice';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';

const useStyles = makeStyles((theme) => ({
    
}));

function Rosters40(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    const seasons = useSelector(seasonsValue);
    const [season, setSeason] = React.useState('');
    const [teamsList, setTeamsList] = React.useState([]);
  
    const handleChange = (event) => {
        console.log('hit')
        setSeason(event.target.value);
        dispatch(get40(event.target.value));
    };
    
    useEffect(() => {
        dispatch(seasonsList({league: 1}));   
        dispatch(get40(season));
    }, []);
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleChange({target: {value: seasons.seasons[0].name}});
        }
    }, [seasons]);

    useEffect(() => {
        console.log('rostersReturned')
        let re = rosters.rosters40.reduce((r, a) => {
            r[a.teamName] = r[a.teamName] || [];
            r[a.teamName].push(a);
            return r;
        }, Object.create(null));
        let tl = Object.keys(re).map((e) => {return re[e]})
        setTeamsList(tl);
    }, [rosters])

    return <div>
        <FormControl fullWidth>
            <InputLabel id="season-select-label">Season</InputLabel>
            <Select
                labelId="season-select-label"
                id="season-select"
                value={season}
                label="Season"
                onChange={handleChange}
            >
                {seasons.seasons.map((seasons) => {
                    return <MenuItem value={seasons.name}>{seasons.name}</MenuItem>;
                })}
            </Select>
        </FormControl>
        <br />
        <br />
        <Grid container spacing={3}>
            {teamsList.map((team) => {
                return <Grid item xs={4}>
                    <Card>
                        <Typography>{team[0].teamName}</Typography>
                        {team.map((player) => {
                            return <Typography>{player.playerName}</Typography>
                        })}
                    </Card>
                </Grid>
            })}
        </Grid>
    </div>
}

export default Rosters40;