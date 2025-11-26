import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Tabs, Tab, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { recordsValue, getPoints, getGoals, getAssists, getPims } from '../redux/recordsSlice';
import PageTitle from '../Components/PageTitle';
import TmhlTable from '../Components/TmhlTable';

const styles = {
    teamItem: {
        background: `#000000AA`,
        backdropFilter: 'blur(10px)'
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

function Records(props) {
    const classes = styles;
    const dispatch = useDispatch();
    const isMobile = window.innerWidth < 600;
    const records = useSelector(recordsValue);
    const [ activeTab, setactiveTab ] = useState("0");    
    const [points, setpoints] = useState(null);
    const [goals, setgoals] = useState(null);
    const [assists, setassists] = useState(null);
    const [pims, setpims] = useState(null);

    
    let pointsColumns = isMobile ? [
        { field: 'position', headerName: 'POS', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'points', headerName: 'P', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pointsRate', headerName: 'PPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ]
    :
    [
        { field: 'position', headerName: 'POSITION', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'points', headerName: 'POINTS', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pointsRate', headerName: 'PPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ];
    let goalsColumns = isMobile ? [
        { field: 'position', headerName: 'POS', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'goals', headerName: 'G', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'goalsRate', headerName: 'GPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ]
    :
    [
        { field: 'position', headerName: 'POSITION', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'goals', headerName: 'GOALS', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'goalsRate', headerName: 'GPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ];
    let assistsColumns = isMobile ? [
        { field: 'position', headerName: 'POS', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'assists', headerName: 'A', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'assistsRate', headerName: 'APG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ]
    :
    [
        { field: 'position', headerName: 'POSITION', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'assists', headerName: 'ASSISTS', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'assistsRate', headerName: 'APG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ];
    let pimsColumns = isMobile ? [
        { field: 'position', headerName: 'POS', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'pims', headerName: 'PIM', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pimsRate', headerName: 'PIMsPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ]
    :
    [
        { field: 'position', headerName: 'POSITION', sortable: true, flex: 1 },
        { field: 'name', headerName: 'NAME', sortable: false, flex: 2 },
        { field: 'pims', headerName: 'PIMS', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
        { field: 'pimsRate', headerName: 'PIMsPG', sortable: true, headerAlign: 'center', align: 'center', flex: 1 },
    ];

    
    const changeTab = (event, newValue) => {
        setactiveTab(newValue);
    };
    
    useEffect(() => {
        dispatch(getPoints());
        dispatch(getGoals());
        dispatch(getAssists());
        dispatch(getPims());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    function addPositions(array, sort = 'points') {
        let pos = 1;
        let lastPoints = 0;
        return array.map((p, i) => {
            if(i===0) {
                lastPoints = p[`${sort}`];
            }else if(p[`${sort}`] < lastPoints) {
                pos=1+i;
                lastPoints = p[`${sort}`];
            }
            return {
                ...p,
                id: i,
                position: pos
            }
        });
    }

    useEffect(() => {
        setpoints(addPositions(records.points, 'points'));
    }, [records.points]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setgoals(addPositions(records.goals, 'goals'));
    }, [records.goals]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setassists(addPositions(records.assists, 'assists'));
    }, [records.assists]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setpims(addPositions(records.pims, 'pims'));
    }, [records.pims]);// eslint-disable-line react-hooks/exhaustive-deps

    return <Container>
        <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', padding: '5px'}}>
            <PageTitle title="Leaderboard" variant="h2"/>
        </Box>
        <br />
        <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)', padding: '5px'}}>
            <Tabs value={activeTab} onChange={changeTab} centered>
                <Tab label={isMobile ? "PTS" : "Points"} value="0"/>
                <Tab label={isMobile ? "G" : "Goals"} value="1"/>
                <Tab label={isMobile ? "A" : "Assists"} value="2"/>
                <Tab label={isMobile ? "PIM" : "Penalties"} value="3"/>
            </Tabs>

            {(records.pointsLoading || records.goalsLoading || records.assistsLoading || records.pointsLoading) && 
                <Box sx={{width: '400px', margin: 'auto'}}>
                    <Skeleton animation="wave" height={300}/>
                </Box>
            }

            <Box sx={{maxWidth: '400px', margin: 'auto'}}>
                {activeTab === "0" && points?.length>0 && !records.pointsLoading &&
                    <TmhlTable
                        rows={points}
                        columns={pointsColumns}
                        hasFilter={true}
                    />
                }
                {activeTab === "1" && goals?.length>0 && !records.goalsLoading &&
                    <TmhlTable
                        rows={goals}
                        columns={goalsColumns}
                        hasFilter={true}
                    />
                }
                {activeTab === "2" && assists?.length>0 && !records.assistsLoading &&
                    <TmhlTable
                        rows={assists}
                        columns={assistsColumns}
                        hasFilter={true}
                    />
                }
                {activeTab === "3" && pims?.length>0 && !records.pimsLoading &&
                    <TmhlTable
                        rows={pims}
                        columns={pimsColumns}
                        hasFilter={true}
                    />
                }
            </Box>

            {/* <TabPanel value="0">Item One</TabPanel>
            <TabPanel value="1">Item Two</TabPanel>
            <TabPanel value="2">Item Three</TabPanel>
            <TabPanel value="3">Item Three</TabPanel> */}
        </Box>
        <Grid container spacing={3}>
            
        </Grid>
        <br />
    </Container>
}

export default Records;