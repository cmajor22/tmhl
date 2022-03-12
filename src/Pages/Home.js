import React, { useEffect } from 'react';
import { Box, Card, Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getPostData, postsValue } from '../redux/postsSlice';
import Logo from '../assets/tmhl_logo.png';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
    },
    postContainer: {
        padding: '10px',
        marginBottom: '15px'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    titleImage: {
        height: '70px'
    },
    titleTextContainer: {
        marginLeft: '10px',
        paddingLeft: '10px',
        borderLeft: `2px solid ${theme.palette.tmhl.accent}`
    },
    titleHeader: {
        fontSize: '32px'
    },
    titleSub: {
        fontSize: '18px',
        color: `#FFFFFF80`
    }
}));

const Post = (props) => {
    const classes = useStyles();
    const title = props.title;
    const message = props.message;
    const date = props.date?.substr(0,10);

    return <Paper elevation={2} className={classes.postContainer}>
        <Box className={classes.titleContainer}>
            <img src={Logo} className={classes.titleImage}/>
            <Box className={classes.titleTextContainer}>
                <Typography className={classes.titleHeader}>{title}</Typography>
                <Typography className={classes.titleSub}>{date}</Typography>
            </Box>
        </Box>
        <div dangerouslySetInnerHTML={{__html: message}} />
    </Paper>
}

function Home(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector(postsValue);
    const [postsList, setpostsList] = React.useState([]);

    useEffect(() => {
        dispatch(getPostData());
    }, []);

    useEffect(() => {
        console.log(posts)
        setpostsList(posts.posts);
    }, [posts]);

    return <Container className={classes.mainContainer}>
        {postsList.map((post) => {
            return <Post title={post.post_title} message={post.post_content} date={post.post_date} />
        })}
    </Container>
}

export default Home;