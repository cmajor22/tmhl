import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getSeasonsData, getGamesData, getPointsData, getPenaltiesData } from '../api/playersApi';

const initialState = {
    playerSeasons: [], playerSeasonsLoading: false,
    playerGames: [], playerGamesLoading: false,
    playerPoints: [], playerPointsLoading: false,
    playerPenalties: [], playerPenaltiesLoading: false,
};

export const playerSeasonsData = createAsyncThunk('seasons', async(params) => {
    const response = await getSeasonsData(params.playerId);
    return response;
});

export const playerGamesData = createAsyncThunk('games', async(params) => {
    const response = await getGamesData(params.playerId);
    return response;
});

export const playerPointsData = createAsyncThunk('points', async(params) => {
    const response = await getPointsData(params.playerId);
    return response;
});

export const playerPenaltiesData = createAsyncThunk('penalties', async(params) => {
    const response = await getPenaltiesData(params.playerId);
    return response;
});


export const players = createSlice({
    name: 'players',
    initialState,
    reducers: { },
    extraReducers: (builder) => { builder
        .addCase(playerSeasonsData.pending, (state) => { state.playerSeasonsLoading = true;})
        .addCase(playerSeasonsData.fulfilled, (state, action) => { state.playerSeasonsLoading = false; state.playerSeasons = [...action.payload]; })
        .addCase(playerGamesData.pending, (state) => { state.playerGamesLoading = true;})
        .addCase(playerGamesData.fulfilled, (state, action) => { state.playerGamesLoading = false; state.playerGames = [...action.payload]; })
        .addCase(playerPointsData.pending, (state) => { state.playerPointsLoading = true;})
        .addCase(playerPointsData.fulfilled, (state, action) => { state.playerPointsLoading = false; state.playerPoints = [...action.payload]; })
        .addCase(playerPenaltiesData.pending, (state) => { state.playerPenaltiesLoading = true;})
        .addCase(playerPenaltiesData.fulfilled, (state, action) => { state.playerPenaltiesLoading = false; state.playerPenalties = [...action.payload]; })
    }
})

export const playersValue = (state) => state.players.players;

export default combineReducers({
    players: players.reducer,
});
