import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import TmhlTable from '../Components/TmhlTable';
import { scheduleGames, scheduleValue } from '../redux/scheduleSlice';
import { seasonsValue, seasonsList } from '../redux/seasonsSlice';

const useStyles = makeStyles((theme) => ({
    
}));

function getFormattedDate(params) {
    return params.value.substr(0,10);
}

function Schedule40(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const seasons = useSelector(seasonsValue);
    const schedule = useSelector(scheduleValue);
    const [season, setSeason] = React.useState('1');
    const [filteredGames, setFilteredGames] = React.useState([]);
    const gamesColumns = [
        { field: 'date', headerName: 'DATE', sortable: false, width: 120, valueGetter: getFormattedDate },
        { field: 'time', headerName: 'TIME', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'homeTeam',  headerName: 'HOME', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'homeGoals',  headerName: 'GOALS', type: 'number', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
        { field: 'awayTeam',  headerName: 'AWAY', sortable: false, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'awayGoals',  headerName: 'GOALS', type: 'number', sortable: false, width: 120, headerAlign: 'center', align: 'center' },
    ];
  
    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
        getData(event.target.value);
    };
    
    useEffect(() => {
        dispatch(seasonsList({league: 2}));     
    }, []);
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleSeasonChange({target: {value: seasons.seasons[0].seasonsid}});
        }
    }, [seasons]);
    
    useEffect(() => {
        console.log('schedChanged')
        let sched = [];
        let i = 0;
        schedule.scheduleGames.forEach((game) => {
            sched.push({
                id: i,
                ...game
            });
            i++;
        });
        setFilteredGames(sched);
    }, [schedule]);

    const getData = (s, t) => {
        dispatch(scheduleGames({league: 2, season: s}));
    }

    return <Fragment>
        <FormControl fullWidth>
            <InputLabel id="season-select-label">Season</InputLabel>
            <Select
                labelId="season-select-label"
                id="season-select"
                value={season}
                label="Season"
                onChange={handleSeasonChange}
            >
                {seasons.seasons.map((season) => {
                    return <MenuItem value={season.seasonsid}>{season.name}</MenuItem>;
                })}
            </Select>
        </FormControl>
        {(filteredGames.length!==0) ?
            <TmhlTable
                rows={filteredGames}
                columns={gamesColumns}
            />
            :
            null
        }
    </Fragment>
}

export default Schedule40;