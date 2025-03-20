import { AppState } from "../../../store/store"
import { BreedsData } from "./types"

export const selectIsLoading = (state: AppState) => {
  return state.breedsChart.isLoading
}

export const selectBreeds = (state: AppState): Array<BreedsData> => {
  return state.breedsChart.breeds
}

export const selectError = (state: AppState) => {
  return state.breedsChart.error
}