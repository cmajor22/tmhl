import React, { useEffect } from 'react';
import { makeStyles, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { get19, get40, rostersValue } from '../redux/rostersSlice';
import { seasons19, seasonsValue } from '../redux/seasonsSlice';

const useStyles = makeStyles((theme) => ({
    
}));

function Rosters19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    const seasons = useSelector(seasonsValue);
    const [season, setSeason] = React.useState('');
  
    const handleChange = (event) => {
        setSeason(event.target.value);
        dispatch(get19(event.target.value));
    };
    
    useEffect(() => {
        dispatch(seasons19(1));        
        dispatch(get19(season));
    }, []);
    
    useEffect(() => {
        if(seasons.seasons19.length>0) {
            setSeason(seasons.seasons19[0]);
            handleChange({target: {value: seasons.seasons19[0].name}});
        }
    }, [seasons]);

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
                {seasons.seasons19.map((seasons) => {
                    return <MenuItem value={seasons.name}>{seasons.name}</MenuItem>;
                })}
            </Select>
        </FormControl>
        {rosters.rosters19.map((player) => {
            return <Typography>{player.playerName}</Typography>
        })}
    </div>
}

export default Rosters19;