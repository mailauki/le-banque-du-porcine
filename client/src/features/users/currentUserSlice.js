import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
  return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
    // .then((r) => {
    //   if (r.ok) {
    //     r.json().then((data) => {
    //       return data
    //     })
    //   } else {
    //     return null
    //   }
    // })
})

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    entities: null,
    status: "idle"
  },
  reducers: {
    balanceAdded(state, action) {
      const currentUser = state.entities

      currentUser.balances.push(action.payload)

      currentUser.total_balance += action.payload.amount

      currentUser.default_balance = currentUser.balances[0]
    },
    balanceDeleted(state, action) {
      const currentUser = state.entities

      const index = currentUser.balances.findIndex((balance) => balance.id === action.payload)
      currentUser.balances.splice(index, 1)

      currentUser.total_balance -= action.payload.amount

      if(!currentUser.balances[0]) {
        currentUser.default_balance = null
      }
    },
    itemAdded(state, action) {
      const currentUser = state.entities

      currentUser.items.push(action.payload)

      currentUser.total_cost += action.payload.price

      currentUser.total_percentage = Math.round(currentUser.total_balance / currentUser.total_cost * 100)
    },
    itemDeleted(state, action) {
      const currentUser = state.entities

      const index = currentUser.items.findIndex((item) => item.id === action.payload)
      currentUser.items.splice(index, 1)

      currentUser.total_cost -= action.payload.price

      currentUser.total_percentage = Math.round(currentUser.total_balance / currentUser.total_cost * 100)
    },
    itemEdited(state, action) {
      const currentUser = state.entities

      const index = currentUser.items.findIndex((item) => item.id === action.payload.id)

      currentUser.total_cost -= currentUser.items[index].price

      currentUser.items.splice(index, 1, action.payload)

      currentUser.total_cost += action.payload.price

      currentUser.total_percentage = Math.round(currentUser.total_balance / currentUser.total_cost * 100)
    }
  },
  extraReducers: {
    [fetchCurrentUser.pending](state) {
      state.status = "loading"
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.entities = action.payload

      if(state.entities.balances[0]) {
        state.entities = {...state.entities, default_balance: state.entities.balances[0]}
      }
      else {
        state.entities = {...state.entities, default_balance: null}
      }

      state.status = "idle"
    }
  }
})

export const { balanceAdded, balanceDeleted, itemAdded, itemDeleted, itemEdited } = currentUserSlice.actions
export default currentUserSlice.reducer