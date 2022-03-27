import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TmhlTable from '../Components/TmhlTable';
import { scheduleGames, scheduleValue } from '../redux/scheduleSlice';
import { seasonsValue, seasonsList } from '../redux/seasonsSlice';
import PageTitle from '../Components/PageTitle';

function getFormattedDate(params) {
    return params.value.substr(0,10);
}

function Schedule40(props) {
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
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleSeasonChange({target: {value: seasons.seasons[0].seasonsid}});
        }
    }, [seasons]);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
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
    }, [schedule]);// eslint-disable-line react-hooks/exhaustive-deps

    const getData = (s, t) => {
        dispatch(scheduleGames({league: 2, season: s}));
    }

    return <Container>
        <PageTitle title="40+ Schedule" variant="h2"/>
        <br />
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
        <br />
        {(filteredGames.length!==0) ?
            <TmhlTable
                rows={filteredGames}
                columns={gamesColumns}
                hasFilter={true}
            />
            :
            null
        }
        <br />
    </Container>
}

export default Schedule40;