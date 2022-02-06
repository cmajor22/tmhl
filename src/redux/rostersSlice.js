import { createAsyncThunk, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getRosters19, getRosters40, getRostersCaptains } from '../api/rostersApi';
import moment from 'moment';

const initialState = {
    rosters19: [],
    rosters19Loading: false,
    rosters40: [],
    rosters40Loading: false,
    captains: [],
    captainsLoading: false,
};

function getYear(year) {
    return moment(year).format('YYYY');
}

const defaultSeason = `${parseInt(getYear(new Date()))-1}-${getYear(new Date())}`;

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

// export const rosters19 = createSlice({
//     name: 'rosters19',
//     initialState,
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(get19.pending, (state) => {
//                 state.rosters19Loading = true;
//             })
//             .addCase(get19.fulfilled, (state, action) => {
//                 state.rosters19Loading = false;
//                 state.rosters19 = [...action.payload];
//             })
//     }
// })

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

// export const rosters40 = createSlice({
//     name: 'rosters40',
//     initialState,
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(get40.pending, (state) => {
//                 state.rosters40Loading = true;
//             })
//             .addCase(get40.fulfilled, (state, action) => {
//                 state.rosters40Loading = false;
//                 state.rosters40 = [...state.rosters40, ...action.payload];
//             })
//     }
// })

export const rostersValue = (state) => state.rosters.rosters;
// export const rosters19Value = (state) => state.rosters19.rosters19;
// export const rosters40Value = (state) => state.rosters40.rosters40;

export default combineReducers({
    rosters: rosters.reducer,
    // rosters19: rosters19.reducer,
    // rosters40: rosters40.reducer
});
