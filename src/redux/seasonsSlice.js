import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getSeasons } from '../api/seasonsApi';

const initialState = {
    seasons19: [],
    seasons19Loading: false,
    seasons40: [],
    seasons40Loading: false,
};

export const seasons19 = createAsyncThunk(
    'seasons/19',
    async() => {
        const response = await getSeasons(1);
        return response;
    }
);

export const seasons40 = createAsyncThunk(
    'seasons/40',
    async() => {
        const response = await getSeasons(2);
        return response;
    }
);

export const seasons = createSlice({
    name: 'seasons',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(seasons19.pending, (state) => {
                state.seasons19Loading = true;
            })
            .addCase(seasons19.fulfilled, (state, action) => {
                state.seasons19Loading = false;
                state.seasons19 = [...action.payload];
            })
            .addCase(seasons40.pending, (state) => {
                state.seasons40Loading = true;
            })
            .addCase(seasons40.fulfilled, (state, action) => {
                state.seasons40Loading = false;
                state.seasons40 = [...action.payload];
            })
    }
})

export const seasonsValue = (state) => state.seasons.seasons;

export default combineReducers({
    seasons: seasons.reducer,
});
