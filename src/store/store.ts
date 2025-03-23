import { configureStore } from "@reduxjs/toolkit"
import { breedsChartSlice } from "../features/breedsChart/slices/BreedsChartSlice"
import type { AppDispatch, AppState } from "./types"

const store = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  }
})

//For testing pourposes
const setupStore = () => {
  return store
}

export { store, setupStore, type AppState, type AppDispatch }
