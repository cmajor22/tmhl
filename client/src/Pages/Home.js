import React, { useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPostData, postsValue } from '../redux/postsSlice';
import Logo from '../assets/tmhl_logo.png';

const styles = {
    postContainer: {
        padding: '10px',
        marginBottom: '15px',
        overflow: 'hidden'
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
        borderLeft: (theme) => `2px solid ${theme.palette.tmhl.accent}`
    },
    titleHeader: {
        fontSize: '32px'
    },
    titleSub: {
        fontSize: '18px',
        color: `#FFFFFF80`
    }
};

const Post = (props) => {
    const classes = styles;
    const title = props.title;
    const message = props.message;
    const date = props.date?.substr(0,10);

    return <Paper elevation={2} sx={classes.postContainer}>
        <Box sx={classes.titleContainer}>
            <img src={Logo} style={classes.titleImage} alt="tmhlLogo"/>
            <Box sx={classes.titleTextContainer}>
                <Typography sx={classes.titleHeader}>{title}</Typography>
                <Typography sx={classes.titleSub}>{date}</Typography>
            </Box>
        </Box>
        <div dangerouslySetInnerHTML={{__html: message}} />
    </Paper>
}

function Home(props) {
    const dispatch = useDispatch();
    const posts = useSelector(postsValue);
    const [postsList, setpostsList] = React.useState([]);

    useEffect(() => {
        dispatch(getPostData());
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setpostsList(posts.posts);
    }, [posts]);// eslint-disable-line react-hooks/exhaustive-deps

    return <Container>
        {postsList.map((post) => {
            return <Post title={post.post_title} message={post.post_content} date={post.post_date} />
        })}
    </Container>
}

export default Home;