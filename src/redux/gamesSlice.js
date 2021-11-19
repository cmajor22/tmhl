import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getGameData } from '../api/gamesApi';

const initialState = {
    games: [],
    gamesLoading: false,
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
                state.gamesLoading = true;
            })
            .addCase(gamesData.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = [...action.payload];
            })
    }
})

export const gamesValue = (state) => state.games.games;

export default combineReducers({
    games: games.reducer,
});
