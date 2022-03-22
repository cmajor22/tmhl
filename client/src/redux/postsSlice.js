import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getPosts } from '../api/postsApi';

const initialState = {
    posts: [],
    postsLoading: false,
};

export const getPostData = createAsyncThunk(
    'posts',
    async() => {
        const response = await getPosts();
        return response;
    }
);

export const posts = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostData.pending, (state) => {state.postsLoading = true;})
            .addCase(getPostData.fulfilled, (state, action) => {
                state.postsLoading = false;
                state.posts = [...action.payload];
            })
    }
})

export const postsValue = (state) => state.posts.posts;

export default combineReducers({
    posts: posts.reducer,
});
