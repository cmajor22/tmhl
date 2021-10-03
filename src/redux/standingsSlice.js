import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getStandingsGames, getStandingsTeams, getStandingsVs } from '../api/standingsApi';

const initialState = {
    standingsGames: [],
    standingsGamesLoading: false,
    standingsTeams: [],
    standingsTeamsLoading: false,
    standingsVs: [],
    standingsVsLoading: false,
};

export const standingsGames = createAsyncThunk(
    'standings/games',
    async(params) => {
        const response = await getStandingsGames(params.league, params.season, params.isPlayoffs, params.isFinals);
        return response;
    }
);

export const standingsVs = createAsyncThunk(
    'standings/vs',
    async(params) => {
        const response = await getStandingsVs(params.league, params.season, params.isPlayoffs, params.isFinals);
        return response;
    }
);

export const standingsTeams = createAsyncThunk(
    'standings/teams',
    async(params) => {
        const response = await getStandingsTeams(params.league, params.season);
        return response;
    }
);

export const standings = createSlice({
    name: 'standings',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(standingsGames.pending, (state) => {
                state.standingsGamesLoading = true;
            })
            .addCase(standingsGames.fulfilled, (state, action) => {
                state.standingsGamesLoading = false;
                state.standingsGames = [...action.payload];
            })
            .addCase(standingsVs.pending, (state) => {
                state.standingsVsLoading = true;
            })
            .addCase(standingsVs.fulfilled, (state, action) => {
                state.standingsVsLoading = false;
                state.standingsVs = [...action.payload];
            })
            .addCase(standingsTeams.pending, (state) => {
                state.standingsTeamsLoading = true;
            })
            .addCase(standingsTeams.fulfilled, (state, action) => {
                state.standingsTeamsLoading = false;
                state.standingsTeams = [...action.payload];
            })
    }
})

export const standingsValue = (state) => state.standings.standings;

export default combineReducers({
    standings: standings.reducer,
});
