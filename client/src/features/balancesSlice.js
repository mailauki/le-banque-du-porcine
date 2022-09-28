import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchBalances = createAsyncThunk("balances/fetchBalances", () => {
  return fetch(`/balances`)
    .then((r) => r.json())
    .then((data) => data)
})

const balancesSlice = createSlice({
  name: 'balances',
  initialState: {
    entities: [],
    status: "idle"
  },
  reducers: {
  },
  extraReducers: {
    [fetchBalances.pending](state) {
      state.status = "loading"
    },
    [fetchBalances.fulfilled](state, action) {
      state.entities = action.payload
      state.status = "idle"
    }
  }
})

export const {  } = balancesSlice.actions
export default balancesSlice.reducer