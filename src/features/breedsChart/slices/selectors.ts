import { AppState } from "../../../store/store"
import { BreedsData } from "./types"
import { createSelector } from "@reduxjs/toolkit"
import { shallowEqual } from "react-redux"

const selectIsLoading = (state: AppState) => {
  return state.breedsChart.isLoading
}

const selectBreeds = (state: AppState): Array<BreedsData> => {
  return state.breedsChart.breeds
}

const selectError = (state: AppState) => {
  return state.breedsChart.error
}

const selectTotalBreedsAmount = (state: AppState) => {
  return state.breedsChart.breeds.length
}

const selectTotalImagesAmount = createSelector(
  selectBreeds,
  (breeds) => {
    return breeds.reduce((count, breed) => count + breed.value, 0);
  }
);

const selectBreedsByTotalImagePercentage = createSelector(
  (state: AppState) => {
    const breeds = selectBreeds(state);

    return { breeds: breeds, totalImages: selectTotalImagesAmount(state) }
  },
  (breedsAndTotalImages) =>  {
    const breedsWithImagePercentage = breedsAndTotalImages.breeds.map((breed) => ({
      name: breed.name,
      value: Number((breed.value / breedsAndTotalImages.totalImages * 100).toFixed(2))
    }));

    return breedsWithImagePercentage.sort((a, b) => b.value - a.value).slice(0, 10)
  }, {
    memoizeOptions: {
        resultEqualityCheck: shallowEqual,
    }
  }
)

export { selectIsLoading, selectBreeds, selectError, selectTotalBreedsAmount, selectTotalImagesAmount, selectBreedsByTotalImagePercentage }