import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Container, Paper, Box, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { get40, rostersValue } from '../redux/rostersSlice';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import PageTitle from '../Components/PageTitle';
import PlayerRow from '../Components/PlayerRow';

const styles = {
    teamItem: {
        padding: '5px'
    },
    playerItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    playerNumber: {
        opacity: '0.4',
        width: '26px',
        marginRight: '3px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    playerExtra: {
        opacity: '0.4',
        marginLeft: '2px',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

function Rosters40(props) {
    const classes = styles;
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    const seasons = useSelector(seasonsValue);
    const [season, setSeason] = React.useState('');
    const [teamsList, setTeamsList] = React.useState([]);
  
    const handleChange = (event) => {
        setSeason(event.target.value);
        dispatch(get40(event.target.value));
    };
    
    useEffect(() => {
        dispatch(seasonsList({league: 1}));   
        dispatch(get40(season));
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleChange({target: {value: seasons.seasons[0].name}});
        }
    }, [seasons]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let re = rosters.rosters40.reduce((r, a) => {
            r[a.teamName] = r[a.teamName] || [];
            r[a.teamName].push(a);
            return r;
        }, Object.create(null));
        let tl = Object.keys(re).map((e) => {return re[e]})
        setTeamsList(tl);
    }, [rosters]);// eslint-disable-line react-hooks/exhaustive-deps

    return <Container>
        <PageTitle title="40+ Rosters" variant="h2"/>
        <br />
        <FormControl fullWidth>
            <InputLabel id="season-select-label">Season</InputLabel>
            <Select
                labelId="season-select-label"
                id="season-select"
                value={season}
                label="Season"
                onChange={handleChange}
            >
                {seasons.seasons.map((seasons, i) => {
                    return <MenuItem key={i} value={seasons.name}>{seasons.name}</MenuItem>;
                })}
            </Select>
        </FormControl>
        <br />
        <br />
        <Grid container spacing={3}>
            {
                !(rosters.rosters40Loading || seasons.seasonsLoading) ?
                    teamsList.map((team, i) => {
                        return <Grid key={i} item xs={12} md={6} lg={4}>
                            <Paper key={i} elevation={3} sx={{background: `#${team[0].primaryColour}15`, backdropFilter: 'blur(10px)'}}>
                                <PageTitle key={i} title={team[0].teamName} variant="h4" primaryColour={team[0].primaryColour} shortForm={team[0].shortForm}/>
                                {team.map((player, i) => {
                                    return <PlayerRow key={i}
                                        playerNumber={player.number} playerName={player.playerName}
                                        isCaptain={player.isCaptain} isGoalie={player.isGoalie} />
                                })}
                            </Paper>
                        </Grid>
                    })
                    :
                    <Box sx={{padding: "15px", width: '100%'}}>
                        <Grid container spacing={3}>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                            <Grid item lg={4}>
                                <Skeleton animation="wave" height={300} sx={{transform: "unset"}}/>
                            </Grid>
                        </Grid>
                    </Box>
                }
            </Grid>
        <br />
    </Container>
}

export default Rosters40;