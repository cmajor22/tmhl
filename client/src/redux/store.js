import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import upcomingGamesReducer from './upcomingGamesSlice';
import rostersReducer from './rostersSlice';
import seasonsReducer from './seasonsSlice';
import standingsReducer from './standingsSlice';
import scheduleReducer from './scheduleSlice';
import statsReducer from './statsSlice';
import gamesSlice from './gamesSlice';
import postsSlice from './postsSlice';
import playersSlice from './playersSlice';
import recordsSlice from './recordsSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    upcomingGames: upcomingGamesReducer,
    rosters: rostersReducer,
    seasons: seasonsReducer,
    standings: standingsReducer,
    schedule: scheduleReducer,
    stats: statsReducer,
    games: gamesSlice,
    posts: postsSlice,
    players: playersSlice,
    records: recordsSlice,
  },
});
