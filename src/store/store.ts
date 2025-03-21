import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { breedsChartSlice } from "../features/breedsChart/slices/BreedsChartSlice"

export const store = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  }
})

export type AppStore = typeof store
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
