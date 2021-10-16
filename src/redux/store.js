import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import upcomingGamesReducer from './upcomingGamesSlice';
import rostersReducer from './rostersSlice';
import seasonsReducer from './seasonsSlice';
import standingsReducer from './standingsSlice';
import scheduleReducer from './scheduleSlice';
import statsReducer from './statsSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    upcomingGames: upcomingGamesReducer,
    rosters: rostersReducer,
    seasons: seasonsReducer,
    standings: standingsReducer,
    schedule: scheduleReducer,
    stats: statsReducer
  },
});
