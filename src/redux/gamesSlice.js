import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getGameData } from '../api/gamesApi';

const initialState = {
    gamesData: [],
    gamesDataLoading: false,
};

export const gamesData = createAsyncThunk(
    'games',
    async(params) => {
        const response = await getGameData(params.gamesId);
        return response;
    }
);

export const games = createSlice({
    name: 'games',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(gamesData.pending, (state) => {
                state.gamesDataLoading = true;
            })
            .addCase(gamesData.fulfilled, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesData = [...action.payload];
            })
    }
})

export const gamesValue = (state) => state.games.games;

export default combineReducers({
    games: games.reducer,
});
