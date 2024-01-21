import { createSlice } from '@reduxjs/toolkit'

const INIT_STATE = {
  isLoading: true,
  data: [],
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: INIT_STATE,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setData: (state, action) => {
      state.isData = action.payload
    },
  },
})
