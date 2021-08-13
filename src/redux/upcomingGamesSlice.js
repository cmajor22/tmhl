import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUpcomingGames } from '../api/upcomingGamesApi';

const initialState = {
    value: [],
    isLoading: false,
};

export const getGames = createAsyncThunk(
    'upcomingGames/getUpcomingGames',
    async() => {
        const response = await getUpcomingGames();
        return response;
    }
);

export const upcomingGames = createSlice({
    name: 'upcomingGames',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = [...state.value, ...action.payload];
            })
    }
})

export const upcomingGamesValue = (state) => state.upcomingGames.value;

export default upcomingGames.reducer;
