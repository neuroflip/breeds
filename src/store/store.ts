import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { breedsChartSlice } from "../features/breedsChart/slices/BreedsChartSlice"

const store = configureStore({
  reducer: {
    breedsChart: breedsChartSlice.reducer
  }
})

type AppStore = typeof store
type AppState = ReturnType<AppStore["getState"]>
type AppDispatch = AppStore["dispatch"]

const useAppDispatch = useDispatch.withTypes<AppDispatch>()
const useAppSelector = useSelector.withTypes<AppState>()

export { store, useAppDispatch, useAppSelector, type AppState, type AppDispatch }