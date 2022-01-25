import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getGameData, getGameGoals, getGamePenalties, getGameHome, getGameAway } from '../api/gamesApi';

const initialState = {
    gamesData: [], gamesDataLoading: false,
    gameGoals: [], gameGoalsLoading: false,
    gamePenalties: [], gamePenaltiesLoading: false,
    gameHome: [], gameHomeLoading: false,
    gameAway: [], gameAwayLoading: false,
};

export const gamesData = createAsyncThunk('games', async(params) => {
    const response = await getGameData(params.gamesId);
    return response;
});

export const gameGoals = createAsyncThunk('goals', async(params) => {
    const response = await getGameGoals(params.gameId);
    return response;
});

export const gamePenalties = createAsyncThunk('penalties', async(params) => {
    const response = await getGamePenalties(params.gameId);
    return response;
});

export const gameHome = createAsyncThunk('home', async(params) => {
    const response = await getGameHome(params.gameId);
    return response;
});

export const gameAway = createAsyncThunk('away', async(params) => {
    const response = await getGameAway(params.gameId);
    return response;
});

export const games = createSlice({
    name: 'games',
    initialState,
    reducers: { },
    extraReducers: (builder) => { builder
        .addCase(gamesData.pending, (state) => { state.gamesDataLoading = true;})
        .addCase(gamesData.fulfilled, (state, action) => { state.gamesDataLoading = false; state.gamesData = [...action.payload]; })
        .addCase(gameGoals.pending, (state) => { state.gameGoalsLoading = true;})
        .addCase(gameGoals.fulfilled, (state, action) => { state.gameGoalsLoading = false; state.gameGoals = [...action.payload]; })
        .addCase(gamePenalties.pending, (state) => { state.gamePenaltiesLoading = true;})
        .addCase(gamePenalties.fulfilled, (state, action) => { state.gamePenaltiesLoading = false; state.gamePenalties = [...action.payload]; })
        .addCase(gameHome.pending, (state) => { state.gameHomeLoading = true;})
        .addCase(gameHome.fulfilled, (state, action) => { state.gameHomeLoading = false; state.gameHome = [...action.payload]; })
        .addCase(gameAway.pending, (state) => { state.gameAwayLoading = true;})
        .addCase(gameAway.fulfilled, (state, action) => { state.gameAwayLoading = false; state.gameAway = [...action.payload]; })
    }
})

export const gamesValue = (state) => state.games.games;

export default combineReducers({
    games: games.reducer,
});
