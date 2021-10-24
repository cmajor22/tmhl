import React, { Fragment, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
}));


function TmhlTable(props) {
    const classes = useStyles();
    const columns = props.columns;
    const rows = props.rows;
    const hasFilter = props.hasFilter;
    const [gamesSearch, setGamesSearch] = React.useState('');
    const [filteredGames, setFilteredGames] = React.useState([]);

    useEffect(() => {
        console.log(rows)
        setFilteredGames(rows);
    },[]);

    useEffect(() => {
        setGamesSearch('');
        console.log(hasFilter)
        // if(hasFilter) {
            setFilteredGames(returnGames(gamesSearch));
        // }
    }, [rows])

    useEffect(()=> {
        setFilteredGames(returnGames(gamesSearch));
    }, [gamesSearch]);

    function returnGames(searchText) {
        return rows.filter((item) => {
            if(searchText===""){
                return true;
            }else if(item.homeTeam?.toLowerCase().includes(searchText.toLowerCase()) ||
                item.awayTeam?.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
        });
    }

    return <Fragment>
        {hasFilter ?
            <TextField label="Standard" variant="standard" value={gamesSearch} onChange={(e) => {setGamesSearch(e.target.value)}}/>
            :
            null
        }
        <DataGrid
            autoHeight
            rows={filteredGames}
            columns={columns}
            density='compact'
            disableColumnFilter={true}
            disableColumnMenu={true}
            hideFooter={true}
        />
    </Fragment>
    
}

export default TmhlTable;