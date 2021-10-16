import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getStatsTeams, getStatsGoalies, getStatsPlayers } from '../api/statsApi';

const initialState = {
    statsTeams: [],
    statsTeamsLoading: false,
    statsGoalies: [],
    statsGoaliesLoading: false,
    statsPlayers: [],
    statsPlayersLoading: false
};

export const statsTeams = createAsyncThunk(
    'stats/teams',
    async(params) => {
        const response = await getStatsTeams(params.season);
        return response;
    }
);

export const statsGoalies = createAsyncThunk(
    'stats/goalies',
    async(params) => {
        const response = await getStatsGoalies(params.isPlayoffs, params.season, params.isFinals);
        return response;
    }
);

export const statsPlayers = createAsyncThunk(
    'stats/players',
    async(params) => {
        const response = await getStatsPlayers(params.isPlayoffs, params.season, params.isFinals);
        return response;
    }
);

export const stats = createSlice({
    name: 'stats',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(statsTeams.pending, (state) => {
                state.statsTeamsLoading = true;
            })
            .addCase(statsTeams.fulfilled, (state, action) => {
                state.statsTeamsLoading = false;
                state.statsTeams = [...action.payload];
            })
            .addCase(statsGoalies.pending, (state) => {
                state.statsGoaliesLoading = true;
            })
            .addCase(statsGoalies.fulfilled, (state, action) => {
                state.statsGoaliesLoading = false;
                state.statsGoalies = [...action.payload];
            })
            .addCase(statsPlayers.pending, (state) => {
                state.statsPlayersLoading = true;
            })
            .addCase(statsPlayers.fulfilled, (state, action) => {
                state.statsPlayersLoading = false;
                state.statsPlayers = [...action.payload];
            })
    }
})

export const statsValue = (state) => state.stats.stats;

export default combineReducers({
    stats: stats.reducer,
});
