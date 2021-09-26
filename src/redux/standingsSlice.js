import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getStandingsGames, getStandingsTeams, getStandingsVs } from '../api/standingsApi';

const initialState = {
    standingsGames: [],
    standingsGamesLoading: false,
    standingsTeams: [],
    standingsTeamsLoading: false,
    standingsVs: [],
    standingsVsLoading: false,
    standingsGames40: [],
    standingsGames40Loading: false,
    standingsTeams40: [],
    standingsTeams40Loading: false,
    standingsVs40: [],
    standingsVs40Loading: false,
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

export const standingsGames40 = createAsyncThunk(
    'standings/games/40',
    async(season, isPlayoffs, isFinals) => {
        const response = await getStandingsGames(2, season, isPlayoffs, isFinals);
        return response;
    }
);

export const standingsVs40 = createAsyncThunk(
    'standings/vs/40',
    async(season, isPlayoffs, isFinals) => {
        const response = await getStandingsVs(2, season, isPlayoffs, isFinals);
        return response;
    }
);

export const standingsTeams40 = createAsyncThunk(
    'standings/teams/40',
    async(season) => {
        const response = await getStandingsTeams(2, season);
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
            .addCase(standingsGames40.pending, (state) => {
                state.standingsGames40Loading = true;
            })
            .addCase(standingsGames40.fulfilled, (state, action) => {
                state.standingsGames40Loading = false;
                state.standingsGames40 = [...action.payload];
            })
            .addCase(standingsVs40.pending, (state) => {
                state.standingsVs40Loading = true;
            })
            .addCase(standingsVs40.fulfilled, (state, action) => {
                state.standingsVs40Loading = false;
                state.standingsVs40 = [...action.payload];
            })
            .addCase(standingsTeams40.pending, (state) => {
                state.standingsTeams40Loading = true;
            })
            .addCase(standingsTeams40.fulfilled, (state, action) => {
                state.standingsTeams40Loading = false;
                state.standingsTeams40 = [...action.payload];
            })
    }
})

export const standingsValue = (state) => state.standings.standings;

export default combineReducers({
    standings: standings.reducer,
});
