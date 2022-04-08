import React, { Fragment, useEffect } from 'react';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from "react-router-dom";

const styles = {
    filterBox: {
        width: '100%'
    }
};


function TmhlTable(props) {
    const classes = styles;
    const { columns, rows, filterType, hasFilter, hiddenColumns } = props;
    const [rowsSearch, setRowsSearch] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState([]);
    const history = useHistory();

    useEffect(() => {
        setFilteredRows(rows);
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setRowsSearch('');
        setFilteredRows(returnRows(rowsSearch));
    }, [rows]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        setFilteredRows(returnRows(rowsSearch));
    }, [rowsSearch]);// eslint-disable-line react-hooks/exhaustive-deps

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
                return false;
            });
        }else{
            return rows.filter((item) => {
                if(searchText===""){
                    return true;
                }else if(item.homeTeam?.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.awayTeam?.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
                return false;
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
            columnVisibilityModel={hiddenColumns}
        />
    </Fragment>
    
}

export default TmhlTable;