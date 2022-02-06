import React, { useEffect } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, Card, Container, Box, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { get19, rostersValue } from '../redux/rostersSlice';
import { seasonsList, seasonsValue } from '../redux/seasonsSlice';
import PageTitle from '../Components/PageTitle';

const useStyles = makeStyles((theme) => ({
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
}));

function Rosters19(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const rosters = useSelector(rostersValue);
    const seasons = useSelector(seasonsValue);
    const [season, setSeason] = React.useState('');
    const [teamsList, setTeamsList] = React.useState([]);
  
    const handleChange = (event) => {
        setSeason(event.target.value);
        dispatch(get19(event.target.value));
    };
    
    useEffect(() => {
        dispatch(seasonsList({league: 1}));        
        dispatch(get19(season));
    }, []);
    
    useEffect(() => {
        if(seasons.seasons.length>0) {
            setSeason(seasons.seasons[0]);
            handleChange({target: {value: seasons.seasons[0].name}});
        }
    }, [seasons]);

    useEffect(() => {
        let re = rosters.rosters19.reduce((r, a) => {
            r[a.teamName] = r[a.teamName] || [];
            r[a.teamName].push(a);
            return r;
        }, Object.create(null));
        let tl = Object.keys(re).map((e) => {return re[e]})
        setTeamsList(tl);
    }, [rosters])

    return <Container>
        <PageTitle title="19+ Rosters" variant="h2"/>
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
                    <Paper elevation={3} className={classes.teamItem}>
                        <PageTitle title={team[0].teamName} variant="h4"/>
                        {team.map((player) => {
                            {console.log(player)}
                            return <Box className={classes.playerItem}>
                                <Typography className={classes.playerNumber}>{player.number}</Typography>
                                <Typography>{player.playerName}</Typography>
                                {player.isCaptain === 1 && <Typography className={classes.playerExtra}>(C)</Typography>}
                                {player.isGoalie === 1 && <Typography className={classes.playerExtra}>(G)</Typography>}
                            </Box>
                        })}
                    </Paper>
                </Grid>
            })}
        </Grid>
        <br />
    </Container>
}

export default Rosters19;