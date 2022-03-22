import React, { Fragment, useEffect } from 'react';
import { TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from "react-router-dom";

const styles = {
    filterBox: {
        width: '100%'
    }
};


function TmhlTable(props) {
    const classes = styles;
    const columns = props.columns;
    const rows = props.rows;
    const filterType = props.filterType;
    const hasFilter = props.hasFilter;
    const [rowsSearch, setRowsSearch] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState([]);
    const history = useHistory();

    useEffect(() => {
        setFilteredRows(rows);
    },[]);

    useEffect(() => {
        setRowsSearch('');
        setFilteredRows(returnRows(rowsSearch));
    }, [rows])

    useEffect(()=> {
        setFilteredRows(returnRows(rowsSearch));
    }, [rowsSearch]);

    function rowClicked(event) {
        event.row.gamesId && history.push(`/game/${event.row.gamesId}`);
    }

    function returnRows(searchText) {
        if(filterType==='player') {
            return rows.filter((item) => {
                if(searchText===""){
                    return true;
                }else if(item.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.team?.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            });
        }else{
            return rows.filter((item) => {
                if(searchText===""){
                    return true;
                }else if(item.homeTeam?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.awayTeam?.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            });
        }
    }

    return <Fragment>
        {hasFilter ?
            <TextField label="Filter" variant="standard" value={rowsSearch} sx={classes.filterBox}
                onChange={(e) => {setRowsSearch(e.target.value)}}/>
            :
            null
        }
        <DataGrid
            autoHeight
            rows={filteredRows}
            columns={columns}
            density='compact'
            disableColumnFilter={true}
            disableColumnMenu={true}
            hideFooter={true}
            onRowClick={(event) => {rowClicked(event)}}
        />
    </Fragment>
    
}

export default TmhlTable;