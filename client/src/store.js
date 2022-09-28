import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import currentUserReducer from './features/users/currentUserSlice';
import balancesReducer from './features/balancesSlice';
// import itemsReducer from './features/itemssSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    balances: balancesReducer,
    // items: itemsReducer,
  }
})

export default store;