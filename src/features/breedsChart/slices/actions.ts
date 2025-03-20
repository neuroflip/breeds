export const fetchBreeds = () => {
  return {
    type: `breedsChart/fetchBreeds`
  }
}

export const getAllBreedsImages = (breeds: Array<string>) => { 
  return {
    type: `breedsChart/getAllBreedsImages`,
    payload: { breeds: breeds }
  }
}