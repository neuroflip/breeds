import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
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

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<AppState>()

export { store, setupStore, useAppDispatch, useAppSelector, type AppState, type AppDispatch }
