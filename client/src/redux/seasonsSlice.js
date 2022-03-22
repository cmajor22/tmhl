import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getSeasons } from '../api/seasonsApi';

const initialState = {
    seasons: [],
    seasonsLoading: false,
};

export const seasonsList = createAsyncThunk(
    'seasons',
    async(params) => {
        const response = await getSeasons(params.league);
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
            .addCase(seasonsList.pending, (state) => {
                state.seasonsLoading = true;
            })
            .addCase(seasonsList.fulfilled, (state, action) => {
                state.seasonsLoading = false;
                state.seasons = [...action.payload];
            })
    }
})

export const seasonsValue = (state) => state.seasons.seasons;

export default combineReducers({
    seasons: seasons.reducer,
});
