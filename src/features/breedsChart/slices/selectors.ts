import { AppState } from "../../../store/store"
import { BreedsData } from "./types"
import { createSelector } from "@reduxjs/toolkit"
import { shallowEqual } from "react-redux"

export const selectIsLoading = (state: AppState) => {
  return state.breedsChart.isLoading
}

export const selectBreeds = (state: AppState): Array<BreedsData> => {
  return state.breedsChart.breeds
}

const selectTotalImages = (breeds: Array<BreedsData>) => {
  return breeds.reduce((count, breed) => count + breed.value, 0)
}

export const selectBreedsByImagePercentage =  createSelector(
  (state: AppState) => {
    const breeds = state.breedsChart.breeds;
    return { breeds: breeds, totalImages: selectTotalImages(breeds) }
  },
  (state) =>  {
    if (state.totalImages === 0) {
      return [];
    }

    const breedsWithImagePercentage = state.breeds.map((breed) => ({
      name: breed.name, value: Number((breed.value / state.totalImages * 100).toFixed(2))
    }));
  
    return breedsWithImagePercentage.sort((a, b) => b.value - a.value).slice(0, 10);
      
  }, {
    memoizeOptions: {
        resultEqualityCheck: shallowEqual,
    },
}
)

export const selectError = (state: AppState) => {
  return state.breedsChart.error
}