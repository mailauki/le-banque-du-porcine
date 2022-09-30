import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCurrentUser = createAsyncThunk("users/fetchCurrentUser", () => {
  return fetch("/me")
    .then((r) => r.json())
    .then((data) => data)
})

// export const signup = createAsyncThunk("users/signup", ({username: username, password: password, password_confirmation: passwordConfirmation, first_name: firstName}) => {
//   return fetch("/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({username: username, password: password, password_confirmation: passwordConfirmation, first_name: firstName})
//   })
//   .then((r) => {
//     if (r.ok) {
//       r.json().then((user) => user)
//     } else {
//       r.json().then((err) => err.errors)
//     }
//   })
// })

// export const login = createAsyncThunk("users/login", ({username: username, password: password}) => {
//   return fetch("/login", {
//     method: "POST",
//     headers:{
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({username: username, password: password})
//   })
//   .then((r) => {
//     if (r.ok) {
//       r.json().then((user) => user)
//     } else {
//       r.json().then((err) => err.errors)
//     }
//   })
// })

export const logout = createAsyncThunk("users/logout", () => {
  return fetch("/logout", {
    method: "DELETE"
  })
  .then((r) => r.json())
  .then(() => null)
})

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    entities: null,
    status: "idle",
    isLoggedIn: false,
    errors: null,
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
    balanceEdited(state, action) {
      const currentUser = state.entities

      const index = currentUser.balances.findIndex((balance) => balance.id === action.payload.id)
      
      currentUser.total_balance -= currentUser.balances[index].amount

      currentUser.balances.splice(index, 1, action.payload)
      
      currentUser.total_balance += action.payload.amount

      currentUser.total_percentage = Math.round(currentUser.total_balance / currentUser.total_cost * 100)
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
    },
    editPreset(state, action) {
      const currentUser = state.entities
      currentUser.preset = action.payload
    }
  },
  extraReducers: {
    [fetchCurrentUser.pending](state) {
      state.status = "loading"
      state.isLoggedIn = false
    },
    [fetchCurrentUser.fulfilled](state, action) {

      if(action.payload.errors) {
        state.entities = null
        state.errors = action.payload.errors
      }
      else {
        if(action.payload.balances) {
          state.entities = {...action.payload, default_balance: action.payload.balances[0], preset: 10}
        }
        else {
          state.entities = {...action.payload, default_balance: null, preset: 10}
        }
        state.errors = null
        state.isLoggedIn = true
      }

      state.status = "idle"
    },
    // [fetchCurrentUser.rejected](state, action) {
    //   state.entities = null
    //   state.status = "idle"
    //   state.isLoggedIn = false
    // },
    // [signup.fulfilled](state, action) {
    //   state.isLoggedIn = false
    // },
    // [signup.rejected](state, action) {
    //   state.isLoggedIn = false
    // },
    // [login.fulfilled](state, action) {
    //   state.isLoggedIn = true
    //   state.entities = action.payload
    // },
    // [login.rejected](state, action) {
    //   state.isLoggedIn = false
    //   state.entities = null
    // },
    [logout.fulfilled](state) {
      state.isLoggedIn = false
      state.entities = null
    },
  }
})

export const { balanceAdded, balanceDeleted, balanceEdited, itemAdded, itemDeleted, itemEdited, editPreset } = currentUserSlice.actions
export default currentUserSlice.reducer