import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getPointsData, getGoalsData, getAssistsData, getPimsData } from '../api/recordsApi';

const initialState = {
    points: [],
    pointsLoading: false,
    goals: [],
    goalsLoading: false,
    assists: [],
    assistsLoading: false,
    pims: [],
    pimsLoading: false,
};

export const getPoints = createAsyncThunk(
    'points',
    async() => {
        const response = await getPointsData();
        return response;
    }
);

export const getGoals = createAsyncThunk(
    'goals',
    async() => {
        const response = await getGoalsData();
        return response;
    }
);

export const getAssists = createAsyncThunk(
    'assists',
    async() => {
        const response = await getAssistsData();
        return response;
    }
);

export const getPims = createAsyncThunk(
    'pims',
    async() => {
        const response = await getPimsData();
        return response;
    }
);

export const records = createSlice({
    name: 'records',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPoints.pending, (state) => {state.pointsLoading = true;})
        .addCase(getPoints.fulfilled, (state, action) => {
            state.pointsLoading = false;
            state.points = [...action.payload];
        })
        .addCase(getGoals.pending, (state) => {state.goalssLoading = true;})
        .addCase(getGoals.fulfilled, (state, action) => {
            state.goalsLoading = false;
            state.goals = [...action.payload];
        })
        .addCase(getAssists.pending, (state) => {state.assistsLoading = true;})
        .addCase(getAssists.fulfilled, (state, action) => {
            state.assistsLoading = false;
            state.assists = [...action.payload];
        })
        .addCase(getPims.pending, (state) => {state.pimsLoading = true;})
        .addCase(getPims.fulfilled, (state, action) => {
            state.pimsLoading = false;
            state.pims = [...action.payload];
        })
    }
})

export const recordsValue = (state) => state.records.records;

export default combineReducers({
    records: records.reducer,
});
