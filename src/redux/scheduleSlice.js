import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getScheduleGames } from '../api/scheduleApi';

const initialState = {
    scheduleGames: [],
    scheduleGamesLoading: false,
};

export const scheduleGames = createAsyncThunk(
    'schedule/games',
    async(params) => {
        const response = await getScheduleGames(params.league, params.season);
        return response;
    }
);

export const schedule = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(scheduleGames.pending, (state) => {
                state.scheduleGamesLoading = true;
            })
            .addCase(scheduleGames.fulfilled, (state, action) => {
                state.scheduleGamesLoading = false;
                state.scheduleGames = [...action.payload];
            })
    }
})

export const scheduleValue = (state) => state.schedule.schedule;

export default combineReducers({
    schedule: schedule.reducer,
});
