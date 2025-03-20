import { RootState } from "../../../store/store"
import { BreedsData } from "./types"

export const selectIsLoading = (state: RootState) => {
  return state.breedsChart.isLoading
}

export const selectBreeds = (state: RootState): Array<BreedsData> => {
  return state.breedsChart.breeds
}

export const selectError = (state: RootState) => {
  return state.breedsChart.error
}