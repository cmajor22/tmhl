import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getGameData, getGameGoals, getGamePenalties, getGameHome, getGameAway } from '../api/gamesApi';

const emptyGame = {
    gameGoals: [],
    gameGoalsLoading: false,
    gamePenalties: [],
    gamePenaltiesLoading: false,
    gameHome: [],
    gameHomeLoading: false,
    gameAway: [],
    gameAwayLoading: false,
};

const initialState = {
    gamesData: [],
    gamesDataLoading: false,
    byId: {},
};

function ensureGame(state, gameId) {
    if (!state.byId[gameId]) {
        state.byId[gameId] = { ...emptyGame };
    }
}

export const gamesData = createAsyncThunk('games/data', async (params) => {
    const response = await getGameData(params.gamesId);
    return response;
});

export const gameGoals = createAsyncThunk('games/goals', async (params) => {
    const response = await getGameGoals(params.gameId);
    return response;
});

export const gamePenalties = createAsyncThunk('games/penalties', async (params) => {
    const response = await getGamePenalties(params.gameId);
    return response;
});

export const gameHome = createAsyncThunk('games/home', async (params) => {
    const response = await getGameHome(params.gameId);
    return response;
});

export const gameAway = createAsyncThunk('games/away', async (params) => {
    const response = await getGameAway(params.gameId);
    return response;
});

export const games = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(gamesData.pending, (state) => {
                state.gamesDataLoading = true;
            })
            .addCase(gamesData.fulfilled, (state, action) => {
                state.gamesDataLoading = false;
                state.gamesData = [...action.payload];
            })

            .addCase(gameGoals.pending, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameGoalsLoading = true;
            })
            .addCase(gameGoals.fulfilled, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameGoalsLoading = false;
                state.byId[gameId].gameGoals = [...action.payload];
            })

            .addCase(gamePenalties.pending, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gamePenaltiesLoading = true;
            })
            .addCase(gamePenalties.fulfilled, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gamePenaltiesLoading = false;
                state.byId[gameId].gamePenalties = [...action.payload];
            })

            .addCase(gameHome.pending, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameHomeLoading = true;
            })
            .addCase(gameHome.fulfilled, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameHomeLoading = false;
                state.byId[gameId].gameHome = [...action.payload];
            })

            .addCase(gameAway.pending, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameAwayLoading = true;
            })
            .addCase(gameAway.fulfilled, (state, action) => {
                const gameId = action.meta.arg.gameId;
                ensureGame(state, gameId);
                state.byId[gameId].gameAwayLoading = false;
                state.byId[gameId].gameAway = [...action.payload];
            });
    },
});

export const gamesValue = (state) => state.games.games;
export const gameById = (gameId) => (state) =>
    state.games.games.byId[gameId] || emptyGame;

export default combineReducers({
    games: games.reducer,
});