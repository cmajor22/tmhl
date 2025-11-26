import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getRosters19, getRosters40, getRostersCaptains } from '../api/rostersApi';

const initialState = {
    rosters19: [],
    rosters19Loading: false,
    rosters40: [],
    rosters40Loading: false,
    captains: [],
    captainsLoading: false,
};

export const get19 = createAsyncThunk(
    'rosters/19',
    async(season) => {
        const response = await getRosters19(1, season);
        return response;
    }
);

export const get40 = createAsyncThunk(
    'rosters/40/',
    async(season) => {
        const response = await getRosters40(2, season);
        return response;
    }
);

export const getCaptains = createAsyncThunk(
    'rosters/captains',
    async() => {
        const response = await getRostersCaptains();
        return response;
    }
);

export const rosters = createSlice({
    name: 'rosters',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(get19.pending, (state) => {state.rosters19Loading = true;})
            .addCase(get19.fulfilled, (state, action) => {
                state.rosters19Loading = false;
                state.rosters19 = [...action.payload];
            })
            .addCase(get40.pending, (state) => {state.rosters40Loading = true;})
            .addCase(get40.fulfilled, (state, action) => {
                state.rosters40Loading = false;
                state.rosters40 = [...action.payload];
            })
            .addCase(getCaptains.pending, (state) => {state.captainsLoading = true;})
            .addCase(getCaptains.fulfilled, (state, action) => {
                state.captainsLoading = false;
                state.captains = [...action.payload];
            })
    }
})

export const rostersValue = (state) => state.rosters.rosters;

export default combineReducers({
    rosters: rosters.reducer,
});
