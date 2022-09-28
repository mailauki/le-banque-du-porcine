import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
  return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
})

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    entities: [],
    status: "idle"
  },
  reducers: {
    balanceAdded(state, action) {
      const currentUser = state.entities

      currentUser.balances.push(action.payload)

      currentUser.total_balance += action.payload.amount
    },
    balanceDeleted(state, action) {
      const currentUser = state.entities

      const index = currentUser.balances.findIndex((balance) => balance.id === action.payload)
      currentUser.balances.splice(index, 1)

      currentUser.total_balance -= action.payload.amount
    },
    itemAdded(state, action) {
      const currentUser = state.entities

      currentUser.items.push(action.payload)

      currentUser.total_cost += action.payload.price
    },
    itemDeleted(state, action) {
      const currentUser = state.entities

      const index = currentUser.items.findIndex((item) => item.id === action.payload)
      currentUser.items.splice(index, 1)

      currentUser.total_cost -= action.payload.price
    },
    itemEdited(state, action) {
      const currentUser = state.entities

      const index = currentUser.items.findIndex((item) => item.id === action.payload.id)

      currentUser.total_cost -= currentUser.items[index].price

      currentUser.items.splice(index, 1, action.payload)

      currentUser.total_cost += action.payload.price
    }
  },
  extraReducers: {
    [fetchCurrentUser.pending](state) {
      state.status = "loading"
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.entities = action.payload
      state.entities = {...state.entities, default_balance: state.entities.balances[0]}
      state.status = "idle"
    }
  }
})

export const { balanceAdded, balanceDeleted, itemAdded, itemDeleted, itemEdited } = currentUserSlice.actions
export default currentUserSlice.reducer