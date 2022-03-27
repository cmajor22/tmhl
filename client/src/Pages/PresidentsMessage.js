import React from 'react';
import { Container, Typography } from '@mui/material';
import PageTitle from '../Components/PageTitle';

function PresidentsMessage(props) {

    return <Container>
        <PageTitle title="President's Message" variant="h2"/>
        <br />
        <Typography>Can’t wait ‘till Sunday night</Typography><br />


        <Typography>After all these years (approximately 20 for me) I still find myself thinking just that.  
        Our small town Sunday night men’s league has been going strong for 32 years.  
        With improvements such as this website, and plans to start an over 40 division in 2010, we are growing and getting better.  
        The leagues only real focus is to provide local recreational hockey to men over 19 years of age.  We do just that.  
        It is organized and very affordably priced.  Besides the fun of playing hockey, there are some other things that make this league great.  
        For one thing a little exercise wouldn’t hurt most of us. Also, because it is a full draft league you meet and play with new people each year.  
        In my own experience I have found that when I started at 20 years old, I played with some of my friend’s fathers and even the odd grandfather.  
        Now it is fun to watch as some of my friend’s sons or even a grandson starts out with us.</Typography><br />

        <Typography>The hockey has always been very good, fun and with just enough competitiveness to keep things interesting.  
        I would like to thank all the people who have helped out in the past, and kept this league running so well, especially our past presidents; 
        Dan Rutledge, Steve Thompson, Steve Gartland, and Tom Perry.  (Please let me know if I missed any of the past presidents)</Typography><br />

        <Typography>So, if you’re looking for fun recreational men’s hockey, sign up, and I’ll see you Sunday night!</Typography><br />

        

        <Typography>Can’t wait!</Typography><br />
        <Typography>Bo Niederhuber</Typography>
        <Typography>President</Typography>
        <Typography>TMHL</Typography>
    </Container>
}

export default PresidentsMessage;