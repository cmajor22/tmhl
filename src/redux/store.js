import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import upcomingGamesReducer from './upcomingGamesSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    upcomingGames: upcomingGamesReducer
  },
});
