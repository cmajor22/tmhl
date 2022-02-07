import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import PageTitle from '../Components/PageTitle';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme) => ({
    formContainer: {
    },
    sendBox: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

function SignUp(props) {
    const classes = useStyles();
    const [fullName, setfullName] = useState('');
    const [address, setaddress] = useState('');
    const [city, setcity] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [mobile, setmobile] = useState('');
    const [age, setage] = useState('');
    const [division, setdivision] = useState('');
    const [position, setposition] = useState('');
    const [levelPlayed, setlevelPlayed] = useState('');
    const [lastYear, setlastYear] = useState('');
    const [people, setpeople] = useState('');
    const [comments, setcomments] = useState('');

    return <Container>
        <PageTitle title="Sign Up Here" variant="h2" />
        <br />
        <Box className={classes.formContainer}>
            <TextField required fullWidth label="Full Name" value={fullName} onChange={(e) => setfullName(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="Address" value={address} onChange={(e) => setaddress(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="City" value={city} onChange={(e) => setcity(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="Postal Code" value={postalCode} onChange={(e) => setpostalCode(e.target.value)} />
            <br /><br />
            <TextField fullWidth required label="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="Phone" value={phone} onChange={(e) => setphone(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="Mobile" value={mobile} onChange={(e) => setmobile(e.target.value)} />
            <br /><br />
            <TextField fullWidth label="Age" value={age} onChange={(e) => setage(e.target.value)} type="number" />
            <br /><br />
            <FormControl fullWidth>
                <InputLabel id="division">Division</InputLabel>
                <Select labelId="division" value={division} label="Division" onChange={(e) => {setdivision(e.target.value)}}>
                    <MenuItem value="19+">19+ Open</MenuItem>
                    <MenuItem value="40+">40+</MenuItem>
                </Select>
            </FormControl>
            <br /><br />
            <FormControl fullWidth>
                <InputLabel id="position">Preferred Position</InputLabel>
                <Select labelId="position" value={position} label="Preferred Position" onChange={(e) => {setposition(e.target.value)}}>
                    <MenuItem value="Forward">Forward</MenuItem>
                    <MenuItem value="Defence">Defence</MenuItem>
                    <MenuItem value="Goalie">Goalie</MenuItem>
                </Select>
            </FormControl>
            <br /><br />
            <FormControl fullWidth>
                <InputLabel id="levelPlayed">Highest Level Played</InputLabel>
                <Select labelId="levelPlayed" value={levelPlayed} label="Highest Level Played" onChange={(e) => {setlevelPlayed(e.target.value)}}>
                    <MenuItem value="RecShinny">Rec/Shinny</MenuItem>
                    <MenuItem value="House">House League</MenuItem>
                    <MenuItem value="Local Rep">Local Rep</MenuItem>
                    <MenuItem value="AA">AA</MenuItem>
                    <MenuItem value="AAA">AAA</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                </Select>
            </FormControl>
            <br /><br />
            <TextField fullWidth label="Last Year Played" value={lastYear} onChange={(e) => setlastYear(e.target.value)} type="number" />
            <br /><br />
            <TextField fullWidth label="Do you know someone in our league?" value={people} onChange={(e) => setpeople(e.target.value)} />
            <br /><br />
            <TextField fullWidth multiline label="Comments" value={comments} onChange={(e) => setcomments(e.target.value)} />
            <br /><br />
            <Box className={classes.sendBox}>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </Box>
            <br /><br />
        </Box>
    </Container>
}

export default SignUp;