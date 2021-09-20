import React, { useEffect } from 'react';
import { makeStyles, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { get40, rostersValue } from '../redux/rostersSlice';

const useStyles = makeStyles((theme) => ({
    
}));

function Rosters40(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    const [season, setSeason] = React.useState('');
  
    const handleChange = (event) => {
      setSeason(event.target.value);
      dispatch(get40(event.target.value));
    };
    
    
    useEffect(() => {
        dispatch(get40(season));
    }, []);

    return <div>
        <FormControl fullWidth>
            <InputLabel id="rosters-40-season-select-label">Season</InputLabel>
            <Select
                labelId="rosters-40-season-select-label"
                id="rosters-40-season-select"
                value={season}
                label="Season"
                onChange={handleChange}
            >
                <MenuItem value={'2020-2021'}>2020-2021</MenuItem>
                <MenuItem value={'2019-2020'}>2019-2020</MenuItem>
            </Select>
        </FormControl>
        {rosters.rosters40.map((player) => {
            return <Typography>{player.playerName}</Typography>
        })}
    </div>
}

export default Rosters40;